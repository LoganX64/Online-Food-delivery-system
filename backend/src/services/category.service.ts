import { Category, ICategory } from '../models/Category.js';
import { AppError } from '../utils/AppError.js';

/**
 * Create a new category for a restaurant.
 * If a soft-deleted category with the same name exists, reactivate it.
 */
export const createCategory = async (restaurantId: string, data: Partial<ICategory>) => {
  // Check for any existing record (active or soft-deleted) with the same name
  const existing = await Category.findOne({ restaurantId, name: data.name });

  if (existing) {
    if (existing.isActive) {
      // Truly a duplicate — reject
      throw new AppError('Category with this name already exists', 400);
    }
    // Previously deleted — reactivate and update description if provided
    existing.isActive = true;
    if (data.description !== undefined) existing.description = data.description;
    await existing.save();
    return existing.toObject();
  }

  const category = new Category({ ...data, restaurantId });
  await category.save();
  return category.toObject();
};

/**
 * Get all categories for a restaurant.
 */
export const getCategoriesByRestaurantId = async (restaurantId: string) => {
  return Category.find({ restaurantId, isActive: true }).sort({ name: 1 }).lean();
};

/**
 * Get a single category by ID.
 */
export const getCategoryById = async (categoryId: string) => {
  const category = await Category.findById(categoryId).lean();
  if (!category) throw new AppError('Category not found', 404);
  return category;
};

/**
 * Update a category by ID, scoped to the restaurant.
 */
export const updateCategory = async (restaurantId: string, categoryId: string, updates: Partial<ICategory>) => {
  // If renaming, check uniqueness against active categories only
  if (updates.name) {
    const existing = await Category.findOne({
      restaurantId,
      name: updates.name,
      isActive: true,
      _id: { $ne: categoryId },
    }).lean();
    if (existing) {
      throw new AppError('Category with this name already exists', 400);
    }
  }

  const category = await Category.findOneAndUpdate(
    { _id: categoryId, restaurantId },
    updates,
    { returnDocument: 'after', runValidators: true }
  ).lean();
  if (!category) throw new AppError('Category not found', 404);
  return category;
};

/**
 * Soft delete a category by ID.
 */
export const deleteCategory = async (restaurantId: string, categoryId: string) => {
  const category = await Category.findOneAndUpdate(
    { _id: categoryId, restaurantId, isActive: true },
    { isActive: false },
    { returnDocument: 'after' }
  ).lean();
  if (!category) throw new AppError('Category not found', 404);
  return { message: 'Category deleted successfully' };
};
