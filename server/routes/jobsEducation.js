import { Router } from 'express';
import { getJobsEducation } from '../controllers/jobsEducationController.js';

const router = Router();

router.get('/', getJobsEducation);

export default router; 