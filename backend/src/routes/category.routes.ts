import { Router } from 'express';
import {
  addCategory,
  fetchMyCategories,
  fetchCategoriesByRestaurant,
  updateCategoryById,
  deleteCategoryById,
} from '../controllers/category.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { categoryCreateSchema, categoryUpdateSchema } from '../utils/validation.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Owner routes (session-based — no restaurantId from frontend)
router.get('/me', authenticate, authorize('restaurantOwner'), fetchMyCategories);
router.post('/', authenticate, authorize('restaurantOwner'), validate(categoryCreateSchema), addCategory);
router.put('/:id', authenticate, authorize('restaurantOwner'), validate(categoryUpdateSchema), updateCategoryById);
router.delete('/:id', authenticate, authorize('restaurantOwner'), deleteCategoryById);

// Public route — get categories for a specific restaurant
router.get('/restaurant/:restaurantId', fetchCategoriesByRestaurant);

export default router;
