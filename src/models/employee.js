import mongoose from 'mongoose';
import User from './account.js'; // Quan trọng: phải có .js

const EmployeeSchema = new mongoose.Schema({
    enrollmentYear: { type: Number },
    department: { type: String, required: true },
    jobs: [{
        jobName: String,
        status: String,
        deadline: Date
    }]
});

const Employee = User.discriminator('Employee', EmployeeSchema);

export default Employee;