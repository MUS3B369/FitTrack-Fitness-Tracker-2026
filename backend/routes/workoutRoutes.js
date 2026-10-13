import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { createWorkout, dashboard, listWorkouts } from '../controllers/workoutController.js';

const router = Router();
router.use(auth);
router.get('/dashboard', dashboard);
router.get('/', listWorkouts);
router.post('/', createWorkout);
export default router;
