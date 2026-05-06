import { Request, Response, NextFunction } from 'express';
import { handlePaymentWebhook } from '../services/payment.service.js';
import { AppError } from '../utils/AppError.js';

export const paymentWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // In a real scenario, verify signature here.
    const { paymentId, status } = req.body;
    if (!paymentId || !['SUCCESS', 'FAILED'].includes(status)) {
      throw new AppError('Invalid webhook payload', 400);
    }

    const result = await handlePaymentWebhook(paymentId, status);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
