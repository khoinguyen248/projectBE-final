import express from 'express';
import { 
    checkIn, 
    checkOut, 
    getTimesheets, 
    getMonthlyReport 
} from '../controller/timesheet.controller.js';

const router = express.Router();

router.post('/check-in', checkIn);
router.post('/check-out', checkOut);
router.get('/', getTimesheets);         // Xem lịch sử chi tiết
router.get('/report', getMonthlyReport); // Xem tổng hợp cộng dồn (Quan trọng)

export default router;