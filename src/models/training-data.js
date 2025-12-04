import mongoose from 'mongoose';

const TrainingDataSchema = new mongoose.Schema({
    salary: { type: Number, required: true },
    avgHours: { type: Number, required: true },  // Giờ làm trung bình/ngày
    lateRate: { type: Number, required: true },  // Tỷ lệ trễ deadline (0.0 -> 1.0)
    years: { type: Number, required: true },     // Thâm niên (năm)
    churn: { type: Boolean, required: true }     // true = Đã nghỉ, false = Còn làm
}, { timestamps: true });

const TrainingData = mongoose.model('TrainingData', TrainingDataSchema);
export default TrainingData;