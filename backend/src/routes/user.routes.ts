import { Router } from 'express';
import {
  registerUser,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { userCreateSchema, userUpdateSchema } from '../utils/validation.js';

const router = Router();

router.post('/', validate(userCreateSchema), registerUser);
router.get('/', fetchAllUsers);
router.get('/:id', fetchUserById);
router.put('/:id', validate(userUpdateSchema), updateUserById);
router.delete('/:id', deleteUserById);

export default router;
