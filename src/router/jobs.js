import express from 'express';
import verifyToken from '../middleware/auth.js'; // <--- Import vào
import { createJob, getAllJobs, updateJob, deleteJob } from '../controller/jobs.controller.js';
import checkAdmin from '../middleware/checkAdmin.js';

const router = express.Router();

router.use(verifyToken, checkAdmin);

router.post('/', createJob);
router.get('/', getAllJobs);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;