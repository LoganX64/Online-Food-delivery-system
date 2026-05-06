import { Request, Response, NextFunction } from 'express';
import {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from '../services/menu.service.js';
import { AppError } from '../utils/AppError.js';

export const addMenuItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId || req.body.ownerId; // Fallback for testing without auth
    if (!ownerId) throw new AppError('Owner ID is required', 400);

    const menuItem = await createMenuItem(ownerId, req.body, req.file);
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

export const fetchAllMenuItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurantId = req.query.restaurantId as string;
    const menuItems = await getAllMenuItems(restaurantId);
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    next(error);
  }
};

export const fetchMenuItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menuItem = await getMenuItemById(req.params.id as string);
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

export const updateMenuItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId || req.body.ownerId;
    if (!ownerId) throw new AppError('Owner ID is required', 400);

    const menuItem = await updateMenuItem(ownerId, req.params.id as string, req.body, req.file);
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

export const deleteMenuItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId || req.body.ownerId;
    if (!ownerId) throw new AppError('Owner ID is required', 400);

    const result = await deleteMenuItem(ownerId, req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
