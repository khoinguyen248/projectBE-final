import mongoose from 'mongoose';

const SalarySchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
        unique: true // Một nhân viên chỉ có 1 cấu hình lương
    },
    baseSalary: { type: Number, required: true }, // Lương cứng
    bonus: { type: Number, default: 0 },          // Thưởng
    deduction: { type: Number, default: 0 },      // Khấu trừ (Phạt)
    payDate: { type: Date, default: Date.now }    // Ngày chốt lương
}, { timestamps: true });

const Salary = mongoose.model('Salary', SalarySchema);
export default Salary;