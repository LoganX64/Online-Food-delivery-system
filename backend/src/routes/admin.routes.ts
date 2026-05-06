import { Router } from 'express';
import {
  fetchAdminRestaurants,
  approveAdminRestaurant,
  rejectAdminRestaurant,
  deactivateAdminRestaurant,
} from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// Apply auth middleware to all admin routes
router.use(authenticate, authorize('admin'));

router.get('/restaurants', fetchAdminRestaurants);
router.post('/restaurants/:id/approve', approveAdminRestaurant);
router.post('/restaurants/:id/reject', rejectAdminRestaurant);
router.put('/restaurants/:id/deactivate', deactivateAdminRestaurant);

export default router;
