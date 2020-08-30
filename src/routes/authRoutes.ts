import { Router } from 'express';
import { registerUser, loginUser, activateUser } from '../controllers/auth';

const router: Router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/activation/:token', activateUser);

export default router;
