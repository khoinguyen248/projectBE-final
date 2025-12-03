import Notification from '../models/notification.js';

// 1. Gửi thông báo (Admin gửi)
export const sendNotification = async (req, res) => {
    try {
        const { title, content, receiverId } = req.body;
        const adminId = req.user.id; // Lấy ID Admin từ Token

        const newNoti = await Notification.create({
            title,
            content,
            createdBy: adminId,
            receivedBy: receiverId || null // Nếu null -> Gửi tất cả
        });

        res.status(201).json({ message: "Đã gửi thông báo!", data: newNoti });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Xem thông báo của tôi (Nhân viên xem)
export const getMyNotifications = async (req, res) => {
    try {
        // CŨ: const { userId } = req.query;
        // MỚI: Lấy từ Token
        const userId = req.user.id; 

        // Lấy thông báo riêng cho mình HOẶC thông báo chung (null)
        const list = await Notification.find({
            $or: [
                { receivedBy: userId },
                { receivedBy: null }
            ]
        })
        .populate('createdBy', 'fname lname') // Hiện tên sếp gửi
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
        res.status(200).json({ message: "Đã đánh dấu đã xem" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};