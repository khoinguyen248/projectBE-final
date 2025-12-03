import express from 'express';
import { 
    getAllEmployees, 
    getEmployeeDetail, 
    updateEmployee, 
    deleteEmployee 
} from '../controller/admin.controller.js';

const router = express.Router();

// Định nghĩa các đường dẫn
router.get('/employees', getAllEmployees);       // Xem tất cả
router.get('/employees/:id', getEmployeeDetail); // Xem chi tiết 1 người
router.put('/employees/:id', updateEmployee);    // Sửa
router.delete('/employees/:id', deleteEmployee); // Xóa (Khóa)

export default router;