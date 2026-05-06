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

const router = Router();

// ─── Restaurant Owner Specific ──────────────────────────────
// Note: '/me' routes must come before '/:id' to avoid conflict

router.get('/me', fetchMyRestaurant);
router.put('/me', validate(restaurantUpdateSchema), updateMyRestaurant);

// ─── Restaurant Orders ──────────────────────────────────────
// Also owner specific, but under '/orders'

router.get('/orders', fetchMyRestaurantOrders);
router.put('/orders/:id/accept', acceptRestaurantOrder);
router.put('/orders/:id/reject', rejectRestaurantOrder);
router.put('/orders/:id/status', validate(orderStatusUpdateSchema), updateRestaurantOrderStatus);

// ─── General Restaurant CRUD ────────────────────────────────

router.post('/', validate(restaurantCreateSchema), addRestaurant);
router.get('/', fetchAllRestaurants);
router.get('/:id', fetchRestaurantById);
router.put('/:id', validate(restaurantUpdateSchema), updateRestaurantById);
router.delete('/:id', deleteRestaurantById);

export default router;
