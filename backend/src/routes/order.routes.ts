import { Router } from 'express';
import { checkout, fetchCustomerOrders, fetchOrderById } from '../controllers/order.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { orderFromCartSchema } from '../utils/validation.js';

const router = Router();

router.post('/', validate(orderFromCartSchema), checkout);
router.get('/', fetchCustomerOrders);
router.get('/:id', fetchOrderById);

export default router;
