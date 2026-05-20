import { Request, Response, NextFunction } from 'express';
import {
  getUserNotifications,
  createNotification,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from '../services/notification.service.js';
import { AppError } from '../utils/AppError.js';

/**
 * GET /api/notifications — Fetch current user's notifications.
 */
export const fetchNotifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    const notifications = await getUserNotifications(userId);
    res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/notifications — Create a notification (internal/system use).
 */
export const createUserNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    const { title, message, type } = req.body;
    const notification = await createNotification(userId, { title, message, type });
    res.status(201).json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/notifications/:id/read — Mark a notification as read.
 */
export const markAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    const notification = await markNotificationRead(userId, req.params.id as string);
    res.status(200).json({ success: true, data: notification });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/notifications/read-all — Mark all notifications as read.
 */
export const markAllAsRead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    const result = await markAllNotificationsRead(userId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/notifications/:id — Delete a notification (ownership enforced in service).
 */
export const removeNotification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user?.userId;
    if (!userId) throw new AppError('Unauthorized', 401);

    const result = await deleteNotification(userId, req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
