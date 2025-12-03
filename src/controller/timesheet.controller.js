import Timesheet from '../models/timesheet.js';

// 1. Check-in (Vào ca)
export const checkIn = async (req, res) => {
    try {
        // ✅ CŨ: const { employeeId } = req.body;
        // ✅ MỚI: Lấy chính xác người đang đăng nhập
        const employeeId = req.user.id; 

        // 1. Xác định khung giờ hôm nay
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // 2. Kiểm tra xem có quên check-out HÔM NAY không
        const openSheetToday = await Timesheet.findOne({
            employeeId,
            checkOut: null,
            createdAt: { $gte: startOfDay, $lte: endOfDay } 
        });

        if (openSheetToday) {
            return res.status(400).json({ 
                message: "Bạn đang trong ca làm việc! Hãy Check-out trước." 
            });
        }

        // 3. Tạo lượt chấm công
        const newSheet = await Timesheet.create({
            employeeId,
            checkIn: new Date(),
            status: 'OnTime'
        });

        res.status(201).json({ 
            message: "Check-in thành công!", 
            data: newSheet 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Check-out (Kết thúc ca)
export const checkOut = async (req, res) => {
    try {
        // ✅ MỚI: Lấy từ Token
        const employeeId = req.user.id; 

        // Tìm ca đang mở (chưa check-out)
        const sheet = await Timesheet.findOne({
            employeeId,
            checkOut: null
        });

        if (!sheet) {
            return res.status(404).json({ message: "Không tìm thấy ca làm việc nào để Check-out!" });
        }

        // Cập nhật giờ ra & Tính toán
        const checkOutTime = new Date();
        sheet.checkOut = checkOutTime;

        const duration = checkOutTime - new Date(sheet.checkIn);
        const hours = duration / (1000 * 60 * 60); 
        
        sheet.totalHours = parseFloat(hours.toFixed(2));

        await sheet.save();

        res.status(200).json({ 
            message: "Check-out thành công!", 
            shiftHours: sheet.totalHours 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Admin xem danh sách (Giữ nguyên hoặc sửa nếu muốn bảo mật hơn)
export const getTimesheets = async (req, res) => {
    try {
        const { employeeId } = req.query; // Admin vẫn có thể lọc theo ID bất kỳ
        
        let filter = {};
        if (employeeId) filter.employeeId = employeeId;

        const list = await Timesheet.find(filter)
            .populate('employeeId', 'fname lname department')
            .sort({ createdAt: -1 });

        res.status(200).json({ count: list.length, data: list });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Báo cáo (Giữ nguyên logic xem report)
export const getMonthlyReport = async (req, res) => {
    // ... (Giữ nguyên code cũ vì API này dùng để xem báo cáo) ...
    // Nếu bạn muốn Employee tự xem báo cáo của mình thì sửa req.query.employeeId -> req.user.id
    // Nhưng API này thường Admin dùng nên để query params cũng ổn.
    
    // CODE CŨ GIỮ NGUYÊN HOẶC COPY LẠI TỪ BÀI TRƯỚC
    try {
        const { employeeId, month, year } = req.query;
        // ... Logic tính toán ...
        // (Copy lại đoạn logic getMonthlyReport ở bài trước vào đây nhé)
        
        // Code rút gọn để bạn đỡ phải lội lại bài cũ:
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59);
        const sheets = await Timesheet.find({
            employeeId,
            workDate: { $gte: startOfMonth, $lte: endOfMonth }
        });
        let total = 0;
        sheets.forEach(s => total += s.totalHours || 0);
        
        res.status(200).json({ totalHours: total, details: sheets });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};