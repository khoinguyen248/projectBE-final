import User from '../models/account.js';
import Job from '../models/jobs.js';
import Schedule from '../models/schedule.js';
import Salary from '../models/salary.js';
import Timesheet from '../models/timesheet.js'; // Import thêm Timesheet để tính giờ

// 1. Xem hồ sơ cá nhân
export const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy ID từ Token

        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: "Không tìm thấy hồ sơ" });

        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Xem công việc (My Jobs)
export const getMyJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const jobs = await Job.find({ employeeId: userId })
            .sort({ deadline: 1 }); // Deadline gần xếp trước

        res.status(200).json({ 
            count: jobs.length, 
            data: jobs 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Xem lịch làm việc (My Schedule)
export const getMySchedule = async (req, res) => {
    try {
        const userId = req.user.id;

        // Tìm lịch mà mảng attendees có chứa ID của mình
        const schedules = await Schedule.find({ attendees: userId })
            .populate('createdBy', 'fname lname')
            .sort({ workDate: -1 });

        res.status(200).json({ 
            count: schedules.length, 
            data: schedules 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Xem Lương (Đã nâng cấp tính theo Giờ làm thực tế)
export const getMySalary = async (req, res) => {
    try {
        const userId = req.user.id;

        // A. Lấy cấu hình lương (Lương cứng, thưởng, phạt)
        const salaryConfig = await Salary.findOne({ employeeId: userId });
        if (!salaryConfig) {
            return res.status(404).json({ message: "Sếp chưa thiết lập lương cho bạn!" });
        }

        // B. Tính tổng giờ làm trong THÁNG HIỆN TẠI
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

        const timesheets = await Timesheet.find({
            employeeId: userId,
            workDate: { $gte: startOfMonth, $lte: endOfMonth }
        });

        // Cộng dồn giờ làm (Accumulate)
        let totalWorkedHours = 0;
        timesheets.forEach(sheet => {
            totalWorkedHours += sheet.totalHours || 0;
        });

        // C. CÔNG THỨC TÍNH LƯƠNG
        // Quy định: 26 ngày công/tháng, 8h/ngày -> 208 giờ chuẩn
        const STANDARD_HOURS = 26 * 8; 
        
        // Tính đơn giá 1 giờ lương
        const hourlyRate = salaryConfig.baseSalary / STANDARD_HOURS;

        // Tính lương dựa trên giờ thực tế
        const salaryByHours = hourlyRate * totalWorkedHours;

        // Tổng thực nhận = Lương giờ thực tế + Thưởng - Phạt
        const totalNetPay = salaryByHours + salaryConfig.bonus - salaryConfig.deduction;

        res.status(200).json({ 
            month: now.getMonth() + 1,
            year: now.getFullYear(),
            salaryConfig: {
                baseSalary: salaryConfig.baseSalary,
                bonus: salaryConfig.bonus,
                deduction: salaryConfig.deduction
            },
            workData: {
                standardHours: STANDARD_HOURS, // Giờ chuẩn công ty
                actualHours: parseFloat(totalWorkedHours.toFixed(2)) // Giờ bạn cày được
            },
            // Làm tròn số tiền
            estimatedNetPay: Math.round(totalNetPay) 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};