import Salary from '../models/salary.js';
import User from '../models/account.js';

// 1. Thiết lập / Cập nhật lương
export const upsertSalary = async (req, res) => {
    try {
        const { employeeId, baseSalary, bonus, deduction } = req.body;

        // Tìm xem nhân viên này đã có bảng lương chưa
        // new: true -> trả về data mới sau khi update
        // upsert: true -> nếu chưa có thì tạo mới
        const salary = await Salary.findOneAndUpdate(
            { employeeId: employeeId }, 
            { baseSalary, bonus, deduction },
            { new: true, upsert: true } 
        );

        res.status(200).json({
            message: "Cập nhật lương thành công!",
            data: salary
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Xem bảng lương của 1 nhân viên (Admin xem hoặc NV xem)
export const getSalaryByEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        
        const salary = await Salary.findOne({ employeeId }).populate('employeeId', 'fname lname email');

        if (!salary) return res.status(404).json({ message: "Nhân viên này chưa được set lương!" });

        // Tính tổng thực nhận (Logic đơn giản)
        const totalReceived = salary.baseSalary + salary.bonus - salary.deduction;

        res.status(200).json({
            data: salary,
            totalNetPay: totalReceived // Trả thêm số này cho FE đỡ phải tính
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};