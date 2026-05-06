import { Restaurant, IRestaurant } from '../models/Restaurant.js';
import { Order, IOrder } from '../models/Order.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

/**
 * Create a new restaurant for an owner.
 */
export const createRestaurant = async (ownerId: string, data: Partial<IRestaurant>) => {
  // Check if owner already has a restaurant
  const existingRestaurant = await Restaurant.findOne({ ownerId }).lean();
  if (existingRestaurant) {
    throw new AppError('Owner already has a restaurant', 400);
  }

  // Ensure user is actually a restaurantOwner
  const user = await User.findById(ownerId).lean();
  if (!user || user.role !== 'restaurantOwner') {
    throw new AppError('Only restaurant owners can create restaurants', 403);
  }

  const restaurant = new Restaurant({ ...data, ownerId });
  await restaurant.save();
  return restaurant.toObject();
};

/**
 * Fetch all restaurants
 */
export const getAllRestaurants = async () => {
  return Restaurant.find().lean();
};

/**
 * Fetch a single restaurant by ID. Throws 404 if not found.
 */
export const getRestaurantById = async (id: string) => {
  const restaurant = await Restaurant.findById(id).lean();
  if (!restaurant) throw new AppError('Restaurant not found', 404);
  return restaurant;
};

/**
 * Fetch the restaurant of the logged-in owner.
 */
export const getRestaurantByOwnerId = async (ownerId: string) => {
  const restaurant = await Restaurant.findOne({ ownerId }).lean();
  if (!restaurant) throw new AppError('Restaurant not found', 404);
  return restaurant;
};

/**
 * Update a restaurant by ID.
 */
export const updateRestaurant = async (id: string, updates: Partial<IRestaurant>) => {
  const restaurant = await Restaurant.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
  if (!restaurant) throw new AppError('Restaurant not found', 404);
  return restaurant;
};

/**
 * Update the restaurant of the logged-in owner.
 */
export const updateRestaurantByOwnerId = async (ownerId: string, updates: Partial<IRestaurant>) => {
  const restaurant = await Restaurant.findOneAndUpdate({ ownerId }, updates, { new: true, runValidators: true }).lean();
  if (!restaurant) throw new AppError('Restaurant not found', 404);
  return restaurant;
};

/**
 * Soft delete a restaurant by ID.
 */
export const deleteRestaurant = async (id: string) => {
  const restaurant = await Restaurant.findByIdAndUpdate(id, { isActive: false }, { new: true }).lean();
  if (!restaurant) throw new AppError('Restaurant not found', 404);
  return { message: 'Restaurant deactivated successfully' };
};

// ─── Order Service Methods for Restaurant Owner ───────────────

/**
 * Fetch all orders for a specific restaurant.
 */
export const getRestaurantOrders = async (restaurantId: string) => {
  return Order.find({ restaurantId }).lean();
};

/**
 * Accept an order
 */
export const acceptOrder = async (orderId: string, restaurantId: string) => {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, restaurantId, status: 'placed' },
    { status: 'accepted' },
    { new: true }
  ).lean();
  if (!order) throw new AppError('Order not found or cannot be accepted', 404);
  return order;
};

/**
 * Reject an order
 */
export const rejectOrder = async (orderId: string, restaurantId: string) => {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, restaurantId, status: 'placed' },
    { status: 'rejected' },
    { new: true }
  ).lean();
  if (!order) throw new AppError('Order not found or cannot be rejected', 404);
  return order;
};

/**
 * Update an order status explicitly
 */
export const updateOrderStatus = async (orderId: string, restaurantId: string, status: IOrder['status']) => {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, restaurantId },
    { status },
    { new: true, runValidators: true }
  ).lean();
  if (!order) throw new AppError('Order not found', 404);
  return order;
};
