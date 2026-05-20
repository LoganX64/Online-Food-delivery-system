import { Router } from 'express';
import {
  fetchNotifications,
  createUserNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
} from '../controllers/notification.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import { notificationCreateSchema } from '../utils/validation.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', fetchNotifications);
router.post('/', validate(notificationCreateSchema), createUserNotification);
router.put('/read-all', markAllAsRead);
router.put('/:id/read', markAsRead);
router.delete('/:id', removeNotification);

export default router;
