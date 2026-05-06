import { Router } from 'express';
import { fetchCustomerRestaurants, fetchRestaurantById, fetchRestaurantMenu } from '../controllers/restaurant.controller.js';

const router = Router();

router.get('/', fetchCustomerRestaurants);
router.get('/:id', fetchRestaurantById);
router.get('/:id/menu', fetchRestaurantMenu);

export default router;
