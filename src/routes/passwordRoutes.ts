import { Router } from 'express';
import { resetPassword, forgotPassword } from '../controllers/password';

const router: Router = Router();

router.post('/forgot', forgotPassword);
router.put('/reset', resetPassword);

export default router;
