import { Router } from 'express';
import { login, register, logout, getMe, forgotPassword, resetPassword } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema, userCreateSchema, forgotPasswordSchema, resetPasswordSchema } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', validate(userCreateSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/logout', authenticate, logout);
router.get('/me', authenticate, getMe);

// Password Reset
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);

export default router;
