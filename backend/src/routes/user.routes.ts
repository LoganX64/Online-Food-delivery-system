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
import { authenticate } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

// /me endpoints (current authenticated user)
router.get('/me', authenticate, fetchMe);
router.put('/me', authenticate, validate(userUpdateSchema), updateMe);
router.post('/profile-image', authenticate, upload.single('image'), uploadProfileImage);

// Admin/System endpoints
router.post('/', validate(userCreateSchema), registerUser);
router.get('/', fetchAllUsers);
router.get('/:id', fetchUserById);
router.put('/:id', validate(userUpdateSchema), updateUserById);
router.delete('/:id', deleteUserById);

export default router;
