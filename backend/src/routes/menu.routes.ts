import { Router } from 'express';
import {
  addMenuItem,
  fetchAllMenuItems,
  fetchMenuItemById,
  updateMenuItemById,
  deleteMenuItemById,
} from '../controllers/menu.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { upload } from '../middleware/upload.middleware.js';
import { menuCreateSchema, menuUpdateSchema } from '../utils/validation.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Menu routes
router.post('/', authenticate, authorize('restaurantOwner'), upload.single('image'), validate(menuCreateSchema), addMenuItem);
router.get('/', fetchAllMenuItems);
router.get('/:id', fetchMenuItemById);
router.put('/:id', authenticate, authorize('restaurantOwner'), upload.single('image'), validate(menuUpdateSchema), updateMenuItemById);
router.delete('/:id', authenticate, authorize('restaurantOwner'), deleteMenuItemById);

export default router;
