import { Restaurant } from '../models/Restaurant.js';
import { AppError } from '../utils/AppError.js';

/**
 * Fetch all restaurants with pagination and optional isApproved filtering
 */
export const getAdminRestaurants = async (page: number, limit: number, isApproved?: boolean) => {
  const query: any = {};
  if (typeof isApproved !== 'undefined') {
    query.isApproved = isApproved;
  }

  const skip = (page - 1) * limit;

  const restaurants = await Restaurant.find(query)
    .skip(skip)
    .limit(limit)
    .lean();
    
  const total = await Restaurant.countDocuments(query);

  return {
    restaurants,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
};

/**
 * Approve a restaurant
 */
export const approveRestaurant = async (id: string) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    id,
    { isApproved: true, isActive: true },
    { new: true }
  ).lean();

  if (!restaurant) throw new AppError('Restaurant not found', 404);
  return restaurant;
};

/**
 * Reject a restaurant
 */
export const rejectRestaurant = async (id: string) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    id,
    { isApproved: false, isActive: false },
    { new: true }
  ).lean();

  if (!restaurant) throw new AppError('Restaurant not found', 404);
  return restaurant;
};

/**
 * Deactivate a restaurant
 */
export const deactivateRestaurant = async (id: string) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  ).lean();

  if (!restaurant) throw new AppError('Restaurant not found', 404);
  return restaurant;
};
