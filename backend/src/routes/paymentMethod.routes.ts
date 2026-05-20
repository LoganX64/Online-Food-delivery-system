import { Router } from 'express';
import {
  fetchPaymentMethods,
  createPaymentMethod,
  editPaymentMethod,
  removePaymentMethod,
} from '../controllers/paymentMethod.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { paymentMethodCreateSchema, paymentMethodUpdateSchema } from '../utils/validation.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', fetchPaymentMethods);
router.post('/', validate(paymentMethodCreateSchema), createPaymentMethod);
router.put('/:id', validate(paymentMethodUpdateSchema), editPaymentMethod);
router.delete('/:id', removePaymentMethod);

export default router;
