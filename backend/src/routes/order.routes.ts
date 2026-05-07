import { Router } from 'express';
import { checkout, fetchCustomerOrders, fetchOrderById } from '../controllers/order.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { orderFromCartSchema } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// All order routes require authentication
router.use(authenticate);

router.post('/', validate(orderFromCartSchema), checkout);
router.get('/', fetchCustomerOrders);
router.get('/:id', fetchOrderById);

export default router;
