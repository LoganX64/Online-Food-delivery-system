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

const router = Router();

router.post('/', validate(addressCreateSchema), addAddress);
router.get('/', fetchAddresses);
router.get('/:id', fetchAddressById);
router.put('/:id', validate(addressUpdateSchema), updateAddressById);
router.delete('/:id', deleteAddressById);

export default router;
