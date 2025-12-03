import express from 'express';
import { createJob, getAllJobs, updateJob, deleteJob } from '../controller/jobs.controller.js';

const router = express.Router();

router.post('/', createJob);       // Tạo job
router.get('/', getAllJobs);       // Xem list
router.put('/:id', updateJob);     // Sửa
router.delete('/:id', deleteJob);  // Xóa

export default router;