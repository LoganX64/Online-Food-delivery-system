import { Notification, INotification } from '../models/Notification.js';
import { AppError } from '../utils/AppError.js';

/**
 * Fetch all notifications for the authenticated user, newest first.
 */
export const getUserNotifications = async (userId: string) => {
  return Notification.find({ userId }).sort({ createdAt: -1 }).lean();
};

/**
 * Create a new notification for a user.
 */
export const createNotification = async (
  userId: string,
  data: Pick<INotification, 'title' | 'message' | 'type'>
) => {
  const notification = new Notification({ ...data, userId });
  await notification.save();
  return notification.toObject();
};

/**
 * Mark a single notification as read. Validates ownership.
 */
export const markNotificationRead = async (userId: string, id: string) => {
  const existing = await Notification.findOne({ _id: id, userId });
  if (!existing) throw new AppError('Notification not found or access denied', 404);

  const updated = await Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { returnDocument: 'after' }
  ).lean();

  return updated;
};

/**
 * Mark all notifications as read for the user.
 */
export const markAllNotificationsRead = async (userId: string) => {
  await Notification.updateMany({ userId, isRead: false }, { isRead: true });
  return { message: 'All notifications marked as read' };
};

/**
 * Delete a notification. Validates ownership.
 */
export const deleteNotification = async (userId: string, id: string) => {
  const existing = await Notification.findOne({ _id: id, userId });
  if (!existing) throw new AppError('Notification not found or access denied', 404);

  await Notification.findByIdAndDelete(id);
  return { message: 'Notification deleted successfully' };
};
