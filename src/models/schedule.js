import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
    workDate: { 
        type: Date, 
        required: true 
    },
    shiftName: { 
        type: String, 
        required: true,
        enum: ['Morning', 'Afternoon', 'Night', 'FullDay'] // Các loại ca
    },
    startTime: { type: String, required: true }, // Ví dụ: "08:00"
    endTime: { type: String, required: true },   // Ví dụ: "17:00"
    
    // Admin nào tạo lịch này
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Danh sách nhân viên phải đi làm trong ca này
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

// Ràng buộc: Một ngày không thể có 2 ca trùng tên (Tùy chọn, ở đây tạm bỏ qua cho dễ)

const Schedule = mongoose.model('Schedule', ScheduleSchema);
export default Schedule;