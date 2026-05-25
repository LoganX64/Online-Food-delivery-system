import { Request, Response, NextFunction } from 'express';
import {
  createCategory,
  getCategoriesByRestaurantId,
  updateCategory,
  deleteCategory,
} from '../services/category.service.js';
import { getRestaurantByOwnerId } from '../services/restaurant.service.js';
import { AppError } from '../utils/AppError.js';

/**
 * POST /categories — Create a new category for the owner's restaurant.
 */
export const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId);
    const category = await createCategory(restaurant._id.toString(), req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /categories — Get all categories for the owner's restaurant.
 */
export const fetchMyCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId);
    const categories = await getCategoriesByRestaurantId(restaurant._id.toString());
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /categories/restaurant/:restaurantId — Get categories for a specific restaurant (public).
 */
export const fetchCategoriesByRestaurant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await getCategoriesByRestaurantId(req.params.restaurantId as string);
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /categories/:id — Update a category.
 */
export const updateCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId);
    const category = await updateCategory(restaurant._id.toString(), req.params.id as string, req.body);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /categories/:id — Soft delete a category.
 */
export const deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ownerId = (req as any).user?.userId;
    if (!ownerId) throw new AppError('Authentication required', 401);

    const restaurant = await getRestaurantByOwnerId(ownerId);
    const result = await deleteCategory(restaurant._id.toString(), req.params.id as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
