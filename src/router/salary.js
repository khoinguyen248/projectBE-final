import express from 'express';
import verifyToken from '../middleware/auth.js'; // <--- Import vào
import { upsertSalary, getSalaryByEmployee } from '../controller/salary.controller.js';
import checkAdmin from '../middleware/checkAdmin.js';

const router = express.Router();

router.use(verifyToken, checkAdmin);

router.post('/', upsertSalary);
router.get('/:employeeId', getSalaryByEmployee);

export default router;