import Notification from '../models/notification.js';

// 1. Gửi thông báo (Admin)
export const sendNotification = async (req, res) => {
    try {
        const { title, content, adminId, receiverId } = req.body;

        const newNoti = await Notification.create({
            title,
            content,
            createdBy: adminId,   // ID Admin gửi
            receivedBy: receiverId || null // Nếu không gửi ID ai -> Gửi tất cả
        });

        res.status(201).json({ message: "Đã gửi thông báo!", data: newNoti });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Xem thông báo của tôi (Dành cho Nhân viên)
export const getMyNotifications = async (req, res) => {
    try {
        const { userId } = req.query; // ID người đang đăng nhập

        // Logic: Lấy những thông báo gửi riêng cho mình HOẶC thông báo chung (null)
        const list = await Notification.find({
            $or: [
                { receivedBy: userId },
                { receivedBy: null }
            ]
        })
        .sort({ createdAt: -1 }); // Mới nhất lên đầu

        res.status(200).json({ count: list.length, data: list });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Đánh dấu đã đọc
export const markAsRead = async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
        res.status(200).json({ message: "Đã xem" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};