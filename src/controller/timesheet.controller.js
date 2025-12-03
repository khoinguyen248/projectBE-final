import Timesheet from '../models/timesheet.js';

// 1. Check-in (Vào ca)
// src/controller/timesheet.controller.js

export const checkIn = async (req, res) => {
    try {
        const { employeeId } = req.body;

        // 1. Xác định khung giờ của ngày hôm nay (Từ 00:00 đến 23:59)
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // 2. Chỉ tìm ca đang mở (quên check-out) TRONG NGÀY HÔM NAY
        const openSheetToday = await Timesheet.findOne({
            employeeId,
            checkOut: null,
            // Thêm điều kiện này để "Reset" qua ngày
            createdAt: { $gte: startOfDay, $lte: endOfDay } 
        });

        // 3. Nếu tìm thấy ca mở HÔM NAY thì mới chặn
        if (openSheetToday) {
            return res.status(400).json({ 
                message: "Bạn đang trong ca làm việc (vừa check-in lúc nãy)! Hãy Check-out trước." 
            });
        }

        // 4. Nếu cái quên check-out là của hôm qua -> Kệ nó, cho tạo cái mới
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
        const { employeeId } = req.body;

        // Tìm đúng cái ca đang mở (checkOut = null)
        const sheet = await Timesheet.findOne({
            employeeId,
            checkOut: null
        });

        if (!sheet) {
            return res.status(404).json({ message: "Bạn chưa Check-in hoặc đã Check-out rồi!" });
        }

        // Cập nhật giờ ra
        const checkOutTime = new Date();
        sheet.checkOut = checkOutTime;

        // Tính giờ làm ca này (CheckOut - CheckIn)
        const duration = checkOutTime - new Date(sheet.checkIn);
        const hours = duration / (1000 * 60 * 60); // Đổi ra giờ
        
        sheet.totalHours = parseFloat(hours.toFixed(2)); // Làm tròn 2 số lẻ

        await sheet.save();

        res.status(200).json({ 
            message: "Check-out thành công!", 
            shiftHours: sheet.totalHours, // Giờ làm của riêng ca này
            data: sheet 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Admin xem danh sách chấm công (Lịch sử)
export const getTimesheets = async (req, res) => {
    try {
        const { employeeId } = req.query;
        
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

// 4. Báo cáo tổng hợp (Tính lương) - QUAN TRỌNG
export const getMonthlyReport = async (req, res) => {
    try {
        // Lấy tháng/năm từ query (VD: ?month=12&year=2025&employeeId=...)
        const { employeeId, month, year } = req.query;

        if (!employeeId || !month || !year) {
            return res.status(400).json({ message: "Vui lòng gửi employeeId, month và year!" });
        }

        // Tạo ngày bắt đầu và kết thúc tháng
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0, 23, 59, 59);

        // Lấy tất cả các ca làm trong tháng đó
        const sheets = await Timesheet.find({
            employeeId,
            workDate: { $gte: startOfMonth, $lte: endOfMonth }
        });

        // Cộng dồn tổng giờ
        let totalMonthHours = 0;
        sheets.forEach(shift => {
            totalMonthHours += shift.totalHours || 0;
        });

        res.status(200).json({
            employeeId,
            month,
            year,
            totalShifts: sheets.length, // Tổng số ca đã làm
            totalHours: parseFloat(totalMonthHours.toFixed(2)), // Tổng giờ công (để tính lương)
            details: sheets // Chi tiết từng ca
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};