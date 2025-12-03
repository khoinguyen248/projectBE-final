import Schedule from '../models/schedule.js';
import User from '../models/account.js';

// 1. Tạo Lịch làm việc mới
export const createSchedule = async (req, res) => {
    try {
        // CŨ: const { ..., adminId } = req.body;
        const { workDate, shiftName, startTime, endTime, attendees } = req.body;
        
        // MỚI: Lấy ID Admin từ Token (An toàn tuyệt đối)
        const adminId = req.user.id; 

        const newSchedule = await Schedule.create({
            workDate,
            shiftName,
            startTime,
            endTime,
            createdBy: adminId, // <-- Tự điền ID Admin vào đây
            attendees: attendees || [] 
        });

        res.status(201).json({
            message: "Tạo lịch làm việc thành công!",
            data: newSchedule
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Xem danh sách lịch (Có populate để hiện tên nhân viên)
export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find()
            .populate('attendees', 'fname lname email department') // Hiện tên NV
            .populate('createdBy', 'fname lname') // Hiện tên Admin tạo
            .sort({ workDate: -1 }); // Sắp xếp ngày mới nhất lên đầu

        res.status(200).json({
            count: schedules.length,
            data: schedules
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Gán thêm nhân viên vào lịch đã có
export const addEmployeeToSchedule = async (req, res) => {
    try {
        const { id } = req.params; // ID của cái Lịch
        const { employeeId } = req.body; // ID nhân viên cần thêm

        const schedule = await Schedule.findById(id);
        if (!schedule) return res.status(404).json({ message: "Không tìm thấy lịch!" });

        // Kiểm tra xem nhân viên này đã có trong lịch chưa để tránh trùng
        if (schedule.attendees.includes(employeeId)) {
            return res.status(400).json({ message: "Nhân viên này đã có trong lịch rồi!" });
        }

        // Thêm vào mảng
        schedule.attendees.push(employeeId);
        await schedule.save();

        res.status(200).json({ message: "Đã thêm nhân viên vào ca làm!", data: schedule });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Xóa lịch
export const deleteSchedule = async (req, res) => {
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Đã xóa lịch làm việc" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};