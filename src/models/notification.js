import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    
    // Người gửi (Admin)
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },

    // Người nhận (Employee). 
    // Nếu null hoặc rỗng -> Tức là gửi cho TOÀN BỘ công ty (Broadcast)
    receivedBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },

    isRead: { type: Boolean, default: false }, // Đã xem chưa

}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;