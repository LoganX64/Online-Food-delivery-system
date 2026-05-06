import { Router } from 'express';
import { fetchCart, addToCart, updateCart, removeFromCart, clearMyCart } from '../controllers/cart.controller.js';
import { validate } from '../middleware/validate.middleware.js';
import { cartItemSchema, cartRemoveSchema } from '../utils/validation.js';

const router = Router();

router.get('/', fetchCart);
router.post('/add', validate(cartItemSchema), addToCart);
router.put('/update', validate(cartItemSchema), updateCart);
router.delete('/remove', validate(cartRemoveSchema), removeFromCart);
router.delete('/clear', clearMyCart);

export default router;
