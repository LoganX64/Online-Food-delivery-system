import { Cart } from '../models/Cart.js';
import { MenuItem } from '../models/MenuItem.js';
import { AppError } from '../utils/AppError.js';
import mongoose from 'mongoose';

export const getCart = async (userId: string) => {
  let cart = await Cart.findOne({ userId }).lean();
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
};

export const addItemToCart = async (userId: string, menuItemId: string, quantity: number) => {
  const menuItem = await MenuItem.findById(menuItemId).lean();
  if (!menuItem) {
    throw new AppError('Menu item not found', 404);
  }
  if (!menuItem.isAvailable) {
    throw new AppError('Menu item is currently unavailable', 400);
  }

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const existingItemIndex = cart.items.findIndex((item: any) => item.menuItemId.toString() === menuItemId);

  if (existingItemIndex > -1) {
    // Update quantity
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    cart.items.push({
      menuItemId: new mongoose.Types.ObjectId(menuItemId),
      restaurantId: menuItem.restaurantId,
      name: menuItem.name,
      price: menuItem.price, // Store current price
      quantity,
    });
  }

  await cart.save();
  return cart.toObject();
};

export const updateCartItemQuantity = async (userId: string, menuItemId: string, quantity: number) => {
  if (quantity <= 0) {
    return removeItemFromCart(userId, menuItemId);
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  const existingItemIndex = cart.items.findIndex((item: any) => item.menuItemId.toString() === menuItemId);
  if (existingItemIndex === -1) {
    throw new AppError('Item not in cart', 404);
  }

  cart.items[existingItemIndex].quantity = quantity;
  await cart.save();
  return cart.toObject();
};

export const removeItemFromCart = async (userId: string, menuItemId: string) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new AppError('Cart not found', 404);
  }

  cart.items = cart.items.filter((item: any) => item.menuItemId.toString() !== menuItemId);
  await cart.save();
  return cart.toObject();
};

export const clearCart = async (userId: string) => {
  const cart = await Cart.findOne({ userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  return { message: 'Cart cleared successfully' };
};
