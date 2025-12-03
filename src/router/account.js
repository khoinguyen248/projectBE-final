import express from 'express';
// Import đúng tên hàm đã export bên controller
import { register, login } from '../controller/account.controller.js'; 

const router = express.Router();

// Định nghĩa các đường dẫn
router.post('/register', register);
router.post('/login', login);

export default router;