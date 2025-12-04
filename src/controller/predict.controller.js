import User from '../models/account.js';
import Salary from '../models/salary.js';
import Timesheet from '../models/timesheet.js';
import Job from '../models/jobs.js';
import TrainingData from '../models/training-data.js'; // Model lưu dữ liệu học
import DecisionTree from 'decision-tree'; // Thư viện ML

// --- HÀM 1: DỰ ĐOÁN NGUY CƠ NGHỈ VIỆC (AI PREDICT) ---
export const predictChurn = async (req, res) => {
    try {
        const { employeeId } = req.params;

        // 1. LẤY DỮ LIỆU THỰC TẾ CỦA NHÂN VIÊN CẦN DỰ ĐOÁN
        const [employee, salary, jobs, timesheets] = await Promise.all([
            User.findById(employeeId),
            Salary.findOne({ employeeId }),
            Job.find({ employeeId }),
            Timesheet.find({ employeeId }).sort({ createdAt: -1 }).limit(60) // Lấy 2 tháng gần nhất
        ]);

        if (!employee) return res.status(404).json({ message: "Nhân viên không tồn tại" });

        // 2. CHUẨN BỊ DỮ LIỆU ĐẦU VÀO (FEATURE ENGINEERING)
        // Biến đổi dữ liệu thô từ DB thành các con số mà AI hiểu được

        // - Lương (Nếu chưa set thì coi như 0)
        const salaryVal = salary ? salary.baseSalary : 0;

        // - Giờ làm trung bình (Avg Hours)
        let avgHours = 8; // Mặc định
        if (timesheets.length > 0) {
            const total = timesheets.reduce((acc, curr) => acc + (curr.totalHours || 0), 0);
            avgHours = total / timesheets.length;
        }

        // - Tỷ lệ trễ deadline (Late Rate)
        let lateRate = 0;
        if (jobs.length > 0) {
            const lateCount = jobs.filter(j => j.status === 'Late').length;
            lateRate = lateCount / jobs.length;
        }

        // - Thâm niên (Years)
        const joinedYear = employee.createdAt ? new Date(employee.createdAt).getFullYear() : new Date().getFullYear();
        const years = new Date().getFullYear() - joinedYear;

        // Tạo object đại diện cho nhân viên hiện tại
        const currentEmployeeFeatures = {
            salary: salaryVal,
            avgHours: parseFloat(avgHours.toFixed(1)), // Làm tròn 1 số lẻ
            lateRate: parseFloat(lateRate.toFixed(2)), // Làm tròn 2 số lẻ
            years: years
        };

        // 3. LẤY DỮ LIỆU HUẤN LUYỆN TỪ DB (TRAINING DATA)
        // Đây là bước quan trọng: Lấy dữ liệu từ Seeder + Dữ liệu học được từ quá khứ
        const dbTrainingData = await TrainingData.find();

        if (dbTrainingData.length === 0) {
            return res.status(500).json({ message: "Chưa có dữ liệu huấn luyện! Hãy chạy Seeder trước." });
        }

        // Chuyển Mongoose Document sang Object thuần JS để thư viện hiểu
        const dataset = dbTrainingData.map(doc => ({
            salary: doc.salary,
            avgHours: doc.avgHours,
            lateRate: doc.lateRate,
            years: doc.years,
            churn: doc.churn // Label: true/false
        }));

        // 4. KHỞI TẠO VÀ TRAIN MODEL (DECISION TREE)
        const class_name = "churn"; 
        const features = ["salary", "avgHours", "lateRate", "years"];

        const dt = new DecisionTree(dataset, class_name, features);

        // 5. THỰC HIỆN DỰ ĐOÁN
        const predicted_churn = dt.predict(currentEmployeeFeatures); // Kết quả: true (Nghỉ) hoặc false (Ở lại)

        // Lấy cấu trúc cây (để vẽ biểu đồ nếu cần)
        const treeModel = dt.toJSON();

        // 6. TRẢ KẾT QUẢ
        res.status(200).json({
            employee: {
                id: employee._id,
                name: `${employee.fname} ${employee.lname}`,
                department: employee.department
            },
            input_analysis: currentEmployeeFeatures, // Show các chỉ số đã tính toán
            prediction: {
                result: predicted_churn ? "Nguy cơ CAO (Sắp nghỉ việc)" : "An toàn (Hài lòng)",
                isChurn: predicted_churn,
                algorithm: "Decision Tree ID3"
            },
            // Trả về số lượng mẫu đã học để Admin biết AI đang khôn cỡ nào
            training_sample_size: dataset.length, 
            tree_structure: treeModel
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// --- HÀM 2: HỌC TỪ NHÂN VIÊN NGHỈ VIỆC (SELF-LEARNING) ---
// Hàm này được gọi khi Admin xóa nhân viên (trong admin.controller.js)
export const learnFromResignedEmployee = async (employeeId) => {
    try {
        // 1. Gom dữ liệu lịch sử
        const [salary, jobs, timesheets, employee] = await Promise.all([
            Salary.findOne({ employeeId }),
            Job.find({ employeeId }),
            Timesheet.find({ employeeId }),
            User.findById(employeeId)
        ]);

        if (!salary || !employee) return; 

        // 2. Tính toán chỉ số (Feature Engineering) - Giống hệt hàm predict ở trên
        const salaryVal = salary.baseSalary;

        let avgHours = 8;
        if (timesheets.length > 0) {
            const total = timesheets.reduce((acc, curr) => acc + (curr.totalHours || 0), 0);
            avgHours = total / timesheets.length;
        }

        let lateRate = 0;
        if (jobs.length > 0) {
            const lateCount = jobs.filter(j => j.status === 'Late').length;
            lateRate = lateCount / jobs.length;
        }

        const joinedYear = employee.createdAt ? new Date(employee.createdAt).getFullYear() : new Date().getFullYear();
        const years = new Date().getFullYear() - joinedYear;

        // 3. LƯU VÀO DB "TRAINING DATA" VỚI NHÃN CHURN = TRUE
        await TrainingData.create({
            salary: salaryVal,
            avgHours: parseFloat(avgHours.toFixed(1)),
            lateRate: parseFloat(lateRate.toFixed(2)),
            years: years,
            churn: true // Xác nhận là đã nghỉ việc
        });

        console.log(`🤖 [AI LEARNING] Đã học thêm kiến thức từ nhân viên ${employee.fname} (Đã nghỉ)!`);

    } catch (error) {
        console.error("Lỗi khi học dữ liệu:", error);
    }
};