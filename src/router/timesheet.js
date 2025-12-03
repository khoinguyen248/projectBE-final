import express from 'express';
import verifyToken from '../middleware/auth.js'; // Import Middleware
import { 
    checkIn, 
    checkOut, 
    getTimesheets, 
    getMonthlyReport 
} from '../controller/timesheet.controller.js';

const router = express.Router();

// --- ÁP DỤNG BẢO MẬT ---
// Ai có Token mới được chấm công
router.post('/check-in', verifyToken, checkIn);
router.post('/check-out', verifyToken, checkOut);

// API xem danh sách & báo cáo (Thường dành cho Admin hoặc Employee xem lại)
// Tạm thời cũng bảo vệ luôn cho chắc
router.get('/', verifyToken, getTimesheets);         
router.get('/report', verifyToken, getMonthlyReport); 

export default router;