import express from 'express';
import verifyToken from '../middleware/auth.js'; // <--- Import vào
import checkAdmin from '../middleware/checkAdmin.js';
import { 
    getAllEmployees, 
    getEmployeeDetail, 
    updateEmployee, 
    deleteEmployee 
} from '../controller/admin.controller.js';

const router = express.Router();

router.use(verifyToken, checkAdmin);

router.get('/employees', getAllEmployees);
router.get('/employees/:id', getEmployeeDetail);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

export default router;