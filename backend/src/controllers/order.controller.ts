import { Request, Response, NextFunction } from 'express';
import { placeOrderFromCart, getCustomerOrders, getOrderDetails } from '../services/order.service.js';
import { AppError } from '../utils/AppError.js';

export const checkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Authentication required', 401);

    const { addressId } = req.body;
    const result = await placeOrderFromCart(userId, addressId);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const fetchCustomerOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Authentication required', 401);

    const orders = await getCustomerOrders(userId as string);
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const fetchOrderById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Authentication required', 401);

    const order = await getOrderDetails(userId as string, req.params.id as string);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
