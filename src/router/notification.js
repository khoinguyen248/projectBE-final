import express from 'express';
import { sendNotification, getMyNotifications, markAsRead } from '../controller/notification.controller.js';

const router = express.Router();

router.post('/', sendNotification);       // Admin gửi
router.get('/', getMyNotifications);      // NV xem (?userId=...)
router.put('/:id/read', markAsRead);      // Đánh dấu đã đọc

export default router;