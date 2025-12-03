import express from 'express';
import verifyToken from '../middleware/auth.js'; // Middleware chặn cửa
import { 
    getMyProfile, 
    getMyJobs, 
    getMySchedule, 
    getMySalary 
} from '../controller/employee.features.controller.js';

const router = express.Router();

// BẮT BUỘC: Phải có Token mới đi qua được dòng này
router.use(verifyToken);

// Các đường dẫn (API)
router.get('/profile', getMyProfile);   
router.get('/jobs', getMyJobs);         
router.get('/schedule', getMySchedule); 
router.get('/salary', getMySalary);     

export default router;