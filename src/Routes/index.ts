import { Router } from 'express';
import userRoutes from './UserRoutes';

const router = Router();
router.get('/', (req, res) => {
  console.log('Base route hit');
  res.send('Reuters Live Backend Running Successfully');
});
router.use('/user', userRoutes);

export default router;
