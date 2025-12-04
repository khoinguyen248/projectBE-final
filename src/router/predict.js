import express from 'express';
// Import 2 lớp bảo vệ (Bắt buộc phải là Admin mới được xem dự báo)
import verifyToken from '../middleware/auth.js';
import checkAdmin from '../middleware/checkAdmin.js';

// Import hàm Controller vừa viết
import { predictChurn } from '../controller/predict.controller.js';

const router = express.Router();

// 1. Kích hoạt bảo mật: Phải có Token + Phải là Admin
router.use(verifyToken, checkAdmin);

// 2. Định nghĩa đường dẫn
// URL đầy đủ sẽ là: /predict/churn/:employeeId
router.get('/churn/:employeeId', predictChurn);

export default router;