import { Router } from 'express';
import {
  addAddress,
  fetchAddresses,
  fetchAddressById,
  updateAddressById,
  deleteAddressById,
} from '../controllers/address.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { addressCreateSchema, addressUpdateSchema } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// Require authentication for all address routes
router.use(authenticate);

router.post('/', validate(addressCreateSchema), addAddress);
router.get('/', fetchAddresses);
router.get('/:id', fetchAddressById);
router.put('/:id', validate(addressUpdateSchema), updateAddressById);
router.delete('/:id', deleteAddressById);

export default router;
