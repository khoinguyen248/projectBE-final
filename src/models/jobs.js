import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    jobName: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, default: Date.now },
    deadline: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'In Progress', 'Done', 'Late'], 
        default: 'Pending' 
    },
    // Quan trọng: Link tới bảng User (Employee)
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    // Lưu vết Admin nào giao việc này (Optional)
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);

export default Job;