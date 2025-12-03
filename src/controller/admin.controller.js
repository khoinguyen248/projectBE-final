import Employee from '../models/employee.js';
import User from '../models/account.js';

// 1. Lấy danh sách toàn bộ nhân viên
export const getAllEmployees = async (req, res) => {
    try {
        // 1. Lấy tham số từ URL
        const { keyword, department, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;

        // 2. Khởi tạo bộ lọc cơ bản
        // Luôn luôn lọc role là Employee để không lẫn Admin vào
        let filter = { role: 'Employee' };

        // 3. Xử lý tìm kiếm từ khóa (Nếu có gửi lên)
        if (keyword) {
            const regex = new RegExp(keyword, 'i'); // 'i' là không phân biệt hoa thường
            
            // Thêm điều kiện $or vào bộ lọc
            filter.$or = [
                { fname: { $regex: regex } },
                { lname: { $regex: regex } },
                { email: { $regex: regex } },
                // Thêm tìm theo SĐT nếu muốn
                { phone: { $regex: regex } } 
            ];
        }

        // 4. Xử lý lọc theo phòng ban (Nếu có gửi lên)
        if (department) {
            filter.department = department;
        }

        // --- DEBUG: In ra để xem bộ lọc có đúng ý không ---
        console.log("Filter đang áp dụng:", JSON.stringify(filter, null, 2));

        // 5. Xử lý Sắp xếp
        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        // 6. TRUY VẤN DB (QUAN TRỌNG NHẤT: Phải truyền biến filter vào đây)
        const list = await Employee.find(filter) 
            .select('-password')      // Bỏ mật khẩu
            .sort(sortOptions)        // Sắp xếp
            .skip((page - 1) * limit) // Phân trang
            .limit(parseInt(limit));  // Giới hạn số lượng

        // Đếm tổng số lượng (để Frontend biết đường chia trang)
        const total = await Employee.countDocuments(filter);

        res.status(200).json({
            message: "Lấy danh sách thành công",
            count: list.length,
            totalDatabase: total,
            currentPage: parseInt(page),
            data: list
        });

    } catch (error) {
        console.error(error);
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