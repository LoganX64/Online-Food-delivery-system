import { Router } from 'express';
import { paymentWebhook } from '../controllers/payment.controller.js';

const router = Router();

router.post('/webhook', paymentWebhook);

export default router;
