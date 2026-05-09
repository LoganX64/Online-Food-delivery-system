import { Request, Response, NextFunction } from 'express';
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByOwnerId,
  updateRestaurantByOwnerId,
  getRestaurantOrders,
  acceptOrder,
  rejectOrder,
  updateOrderStatus,
  getDiscoverRestaurants,
  searchRestaurantsAndItems,
  getEarningsSummary,
} from '../services/restaurant.service.js';
import { getAllMenuItems } from '../services/menu.service.js';
import { AppError } from '../utils/AppError.js';

// ─── General Restaurant CRUD ────────────────────────────────

export const addRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required to add a restaurant', 401);

    const restaurant = await createRestaurant(ownerId, req.body);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

export const fetchAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurants = await getAllRestaurants();
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    next(error);
  }
};

export const fetchRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new AppError('Restaurant ID is required', 400);
    }

    const restaurant = await getRestaurantById(id as string);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error: any) {
    if (error.name === 'CastError') {
      return next(new AppError('Invalid Restaurant ID format', 400));
    }
    next(error);
  }
};

export const updateRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const restaurant = await updateRestaurant(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

export const deleteRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await deleteRestaurant(req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// ─── Restaurant Owner Specific ──────────────────────────────

export const fetchMyRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId as string);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

export const updateMyRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await updateRestaurantByOwnerId(ownerId as string, req.body);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

export const fetchMyRestaurantEarnings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId as string);
    const summary = await getEarningsSummary(restaurant._id.toString());
    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};

// ─── Restaurant Orders ──────────────────────────────────────

export const fetchMyRestaurantOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // First, find the restaurant owned by the user
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId as string);
    const orders = await getRestaurantOrders(restaurant._id.toString());
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const acceptRestaurantOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId as string);
    const order = await acceptOrder(req.params.id as string, restaurant._id.toString());
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const rejectRestaurantOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId as string);
    const order = await rejectOrder(req.params.id as string, restaurant._id.toString());
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

export const updateRestaurantOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId as string);
    const order = await updateOrderStatus(req.params.id as string, restaurant._id.toString(), req.body.status);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

// ─── Customer Endpoints ─────────────────────────────────────

export const fetchCustomerRestaurants = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { pincode, minRating, sort } = req.query;
    const restaurants = await getDiscoverRestaurants({
      pincode: pincode as string,
      minRating: minRating ? Number(minRating) : undefined,
      sort: sort as string,
    });
    res.status(200).json({ success: true, data: restaurants });
  } catch (error) {
    next(error);
  }
};

export const searchRestaurantAndFoodItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    if (!q) {
      throw new AppError('Search query is required', 400);
    }

    const results = await searchRestaurantsAndItems(q as string);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

export const fetchRestaurantMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // verify restaurant exists
    await getRestaurantById(req.params.id as string);
    const menuItems = await getAllMenuItems(req.params.id as string);
    res.status(200).json({ success: true, data: menuItems });
  } catch (error) {
    next(error);
  }
};
