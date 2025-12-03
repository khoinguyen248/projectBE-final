import express from 'express';
import verifyToken from '../middleware/auth.js'; // <--- Import vào
import checkAdmin from '../middleware/checkAdmin.js';
import { 
    createSchedule, 
    getAllSchedules, 
    addEmployeeToSchedule, 
    deleteSchedule 
} from '../controller/schedule.controller.js';

const router = express.Router();

router.use(verifyToken, checkAdmin);

router.post('/', createSchedule);
router.get('/', getAllSchedules);
router.put('/:id/assign', addEmployeeToSchedule);
router.delete('/:id', deleteSchedule);

export default router;