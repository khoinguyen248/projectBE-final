import mongoose from 'mongoose';

const baseOptions = {
    discriminatorKey: 'role', // Khóa để phân biệt Admin/Employee
    collection: 'users',      // Lưu chung vào 1 bảng users
    timestamps: true
};

const UserSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    dob: { type: Date },
    sex: { type: String, enum: ['Male', 'Female', 'Other'] },
    status: { type: String, default: 'Active' }
}, baseOptions);

const User = mongoose.model('User', UserSchema);

export default User;