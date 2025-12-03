import express from 'express';
import verifyToken from '../middleware/auth.js'; // Import Middleware
import { 
    sendNotification, 
    getMyNotifications, 
    markAsRead 
} from '../controller/notification.controller.js';

const router = express.Router();

// --- KÍCH HOẠT BẢO MẬT ---
router.use(verifyToken);

router.post('/', sendNotification);       // Gửi
router.get('/', getMyNotifications);      // Xem
router.put('/:id/read', markAsRead);      // Đánh dấu đã đọc

export default router;