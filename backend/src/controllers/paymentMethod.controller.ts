import { Request, Response, NextFunction } from 'express';
import {
  getUserPaymentMethods,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from '../services/paymentMethod.service.js';
import { AppError } from '../utils/AppError.js';

/**
 * GET /api/payment-methods — Fetch current user's payment methods.
 */
export const fetchPaymentMethods = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    const methods = await getUserPaymentMethods(userId);
    res.status(200).json({ success: true, data: methods });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/payment-methods — Add a new payment method.
 */
export const createPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    // Security: never accept userId from body
    const { provider, last4, token, isDefault } = req.body;
    const method = await addPaymentMethod(userId, { provider, last4, token, isDefault });
    res.status(201).json({ success: true, data: method });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/payment-methods/:id — Update a payment method (ownership enforced in service).
 */
export const editPaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    const { provider, last4, token, isDefault } = req.body;
    const method = await updatePaymentMethod(userId, req.params.id as string, {
      provider,
      last4,
      token,
      isDefault,
    });
    res.status(200).json({ success: true, data: method });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/payment-methods/:id — Delete a payment method (ownership enforced in service).
 */
export const removePaymentMethod = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    const result = await deletePaymentMethod(userId, req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
