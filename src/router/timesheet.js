import express from 'express';
import verifyToken from '../middleware/auth.js'; 
import checkAdmin from '../middleware/checkAdmin.js'; // <--- Import thêm cái này
import { 
    checkIn, 
    checkOut, 
    getTimesheets, 
    getMonthlyReport 
} from '../controller/timesheet.controller.js';

const router = express.Router();

// 1. Ai cũng phải có Token mới được vào
router.use(verifyToken);

// 2. Chấm công: Ai cũng làm được (Employee + Admin) -> KHÔNG CẦN checkAdmin
router.post('/check-in', checkIn);
router.post('/check-out', checkOut);

// 3. Xem báo cáo: CHỈ ADMIN MỚI ĐƯỢC XEM -> Gắn checkAdmin vào đây
router.get('/', checkAdmin, getTimesheets);         
router.get('/report', checkAdmin, getMonthlyReport); 

export default router;