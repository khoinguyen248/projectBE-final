import mongoose from 'mongoose';

const TimesheetSchema = new mongoose.Schema({
    employeeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    workDate: { 
        type: Date, 
        default: Date.now // Mặc định là ngày hôm nay
    },
    checkIn: { type: Date },  // Giờ vào
    checkOut: { type: Date }, // Giờ ra
    totalHours: { type: Number, default: 0 }, // Tổng giờ làm trong ngày
    status: { 
        type: String, 
        enum: ['OnTime', 'Late', 'Absent'], 
        default: 'OnTime' 
    }
}, { timestamps: true });

const Timesheet = mongoose.model('Timesheet', TimesheetSchema);
export default Timesheet;