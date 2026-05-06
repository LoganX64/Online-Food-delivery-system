import { Router } from 'express';
import { checkout } from '../controllers/order.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { orderFromCartSchema } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', authenticate, validate(orderFromCartSchema), checkout);

export default router;
