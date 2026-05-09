import { Router } from 'express';
import {
  addRestaurant,
  fetchAllRestaurants,
  fetchRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
  fetchMyRestaurant,
  updateMyRestaurant,
  fetchMyRestaurantOrders,
  acceptRestaurantOrder,
  rejectRestaurantOrder,
  updateRestaurantOrderStatus,
} from '../controllers/restaurant.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  restaurantCreateSchema,
  restaurantUpdateSchema,
  orderStatusUpdateSchema,
} from '../utils/validation.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// ─── Restaurant Owner Specific ──────────────────────────────
// Note: '/me' routes must come before '/:id' to avoid conflict

router.get('/me', authenticate, authorize('restaurantOwner'), fetchMyRestaurant);
router.put('/me', authenticate, authorize('restaurantOwner'), validate(restaurantUpdateSchema), updateMyRestaurant);

// ─── Restaurant Orders ──────────────────────────────────────
// Also owner specific, but under '/orders'

router.get('/orders', authenticate, authorize('restaurantOwner'), fetchMyRestaurantOrders);
router.put('/orders/:id/accept', authenticate, authorize('restaurantOwner'), acceptRestaurantOrder);
router.put('/orders/:id/reject', authenticate, authorize('restaurantOwner'), rejectRestaurantOrder);
router.put('/orders/:id/status', authenticate, authorize('restaurantOwner'), validate(orderStatusUpdateSchema), updateRestaurantOrderStatus);

// ─── General Restaurant CRUD ────────────────────────────────

router.post('/', authenticate, authorize('restaurantOwner'), validate(restaurantCreateSchema), addRestaurant);
router.get('/', fetchAllRestaurants);
router.get('/:id', fetchRestaurantById);
router.put('/:id', authenticate, authorize('admin'), validate(restaurantUpdateSchema), updateRestaurantById);
router.delete('/:id', authenticate, authorize('admin'), deleteRestaurantById);

export default router;
