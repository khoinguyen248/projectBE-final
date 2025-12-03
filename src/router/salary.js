import express from 'express';
import { upsertSalary, getSalaryByEmployee } from '../controller/salary.controller.js';

const router = express.Router();

router.post('/', upsertSalary);           // Tạo hoặc Sửa lương
router.get('/:employeeId', getSalaryByEmployee); // Xem lương

export default router;