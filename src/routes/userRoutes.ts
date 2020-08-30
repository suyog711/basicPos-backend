import { Router } from 'express';
import { updateUser, getUser } from '../controllers/user';

const router: Router = Router();

router.get('/profile', getUser);
router.put('/profile', updateUser);

export default router;
