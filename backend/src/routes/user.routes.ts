import { Router } from 'express';
import {
  registerUser,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
  deleteUserById,
  fetchMe,
  updateMe,
  uploadProfileImage,
} from '../controllers/user.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { userCreateSchema, userUpdateSchema } from '../utils/validation.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

// /me endpoints (current authenticated user)
router.get('/me', authenticate, fetchMe);
router.put('/me', authenticate, validate(userUpdateSchema), updateMe);
router.post('/profile-image', authenticate, upload.single('image'), uploadProfileImage);

// Admin/System endpoints
router.post('/', authenticate, authorize('admin'), validate(userCreateSchema), registerUser);
router.get('/', authenticate, authorize('admin'), fetchAllUsers);
router.get('/:id', authenticate, authorize('admin'), fetchUserById);
router.put('/:id', authenticate, authorize('admin'), validate(userUpdateSchema), updateUserById);
router.delete('/:id', authenticate, authorize('admin'), deleteUserById);

export default router;
