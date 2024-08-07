import { Router } from 'express';
import { createProject, getProjects } from '../controllers/project';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjects);

export default router;
