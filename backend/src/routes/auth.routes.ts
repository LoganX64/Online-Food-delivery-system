import { Router } from 'express';
import { login } from '../controllers/auth.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { loginSchema } from '../utils/validation.js';

const router = Router();

router.post('/login', validate(loginSchema), login);

export default router;
