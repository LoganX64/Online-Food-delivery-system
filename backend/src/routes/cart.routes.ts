import { Router } from 'express';
import { fetchCart, addToCart, updateCart, removeFromCart, clearMyCart } from '../controllers/cart.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { cartItemSchema, cartRemoveSchema } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// All cart routes require authentication
router.use(authenticate);

router.get('/', fetchCart);
router.post('/add', validate(cartItemSchema), addToCart);
router.put('/update', validate(cartItemSchema), updateCart);
router.delete('/remove', validate(cartRemoveSchema), removeFromCart);
router.delete('/clear', clearMyCart);

export default router;
