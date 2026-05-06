import { Request, Response, NextFunction } from 'express';
import { getCart, addItemToCart, updateCartItemQuantity, removeItemFromCart, clearCart } from '../services/cart.service.js';
import { AppError } from '../utils/AppError.js';

export const fetchCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId || req.query.userId;
    if (!userId) throw new AppError('User ID is required', 400);

    const cart = await getCart(userId as string);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId || req.body.userId;
    if (!userId) throw new AppError('User ID is required', 400);

    const { menuItemId, quantity } = req.body;
    const cart = await addItemToCart(userId, menuItemId, quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId || req.body.userId;
    if (!userId) throw new AppError('User ID is required', 400);

    const { menuItemId, quantity } = req.body;
    const cart = await updateCartItemQuantity(userId, menuItemId, quantity);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId || req.body.userId;
    if (!userId) throw new AppError('User ID is required', 400);

    const { menuItemId } = req.body;
    const cart = await removeItemFromCart(userId, menuItemId);
    res.status(200).json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const clearMyCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId || req.body.userId;
    if (!userId) throw new AppError('User ID is required', 400);

    const result = await clearCart(userId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
