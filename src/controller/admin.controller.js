import Employee from '../models/employee.js';
import User from '../models/account.js';

// 1. Lấy danh sách toàn bộ nhân viên
export const getAllEmployees = async (req, res) => {
    try {
        // Tìm tất cả User có role là Employee
        // .select('-password') nghĩa là: Lấy hết trừ cột password ra (để bảo mật)
        const list = await Employee.find().select('-password');
        
        res.status(200).json({
            message: "Lấy danh sách thành công",
            count: list.length,
            data: list
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Xem chi tiết 1 nhân viên
export const getEmployeeDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await Employee.findById(id).select('-password');

        if (!emp) return res.status(404).json({ message: "Không tìm thấy nhân viên" });

        res.status(200).json({ data: emp });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Admin sửa thông tin nhân viên
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Gửi gì sửa nấy (fname, department, salary...)

        // { new: true } để trả về data mới sau khi update
        const updatedEmp = await Employee.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedEmp) return res.status(404).json({ message: "Không tìm thấy nhân viên để sửa" });

        res.status(200).json({
            message: "Cập nhật thành công!",
            data: updatedEmp
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Xóa nhân viên (Soft Delete - Khuyên dùng)
// Thay vì xóa bay màu khỏi DB, ta chỉ đổi Status = 'Inactive' để lưu lịch sử
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedEmp = await User.findByIdAndUpdate(id, { status: 'Inactive' }, { new: true });

        if (!deletedEmp) return res.status(404).json({ message: "Không tìm thấy nhân viên" });

        res.status(200).json({ message: "Đã khóa tài khoản nhân viên này!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};