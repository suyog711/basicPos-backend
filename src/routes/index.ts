import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import passwordRoutes from './passwordRoutes';
const router: Router = Router();

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/password', passwordRoutes);

export default router;
