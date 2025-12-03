import express from 'express';
import { 
    createSchedule, 
    getAllSchedules, 
    addEmployeeToSchedule, 
    deleteSchedule 
} from '../controller/schedule.controller.js';

const router = express.Router();

router.post('/', createSchedule);              // Tạo lịch
router.get('/', getAllSchedules);              // Xem tất cả
router.put('/:id/assign', addEmployeeToSchedule); // Gán thêm NV vào lịch
router.delete('/:id', deleteSchedule);         // Xóa lịch

export default router;