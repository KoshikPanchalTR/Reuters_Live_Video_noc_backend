import { Router } from 'express';
import userRoutes from './UserRoutes';

const router = Router();

router.use('/user', userRoutes);

export default router;
