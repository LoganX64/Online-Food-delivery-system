import { MenuItem, IMenuItem } from '../models/MenuItem.js';
import { Restaurant } from '../models/Restaurant.js';
import { AppError } from '../utils/AppError.js';
import { uploadImage, deleteImage } from '../utils/cloudinary.js';

export const createMenuItem = async (
  ownerId: string,
  data: Partial<IMenuItem>,
  file?: Express.Multer.File
) => {
  // Ensure the restaurant belongs to the user creating the menu item
  const restaurant = await Restaurant.findOne({ _id: data.restaurantId, ownerId }).lean();
  if (!restaurant) {
    throw new AppError('Restaurant not found or unauthorized', 403);
  }

  let imageUrl: string | undefined = undefined;
  if (file) {
    imageUrl = await uploadImage(file.buffer, 'menu_items');
  }

  const menuItem = new MenuItem({ ...data, image: imageUrl });
  await menuItem.save();
  return menuItem.toObject();
};

export const getAllMenuItems = async (restaurantId?: string) => {
  const query = restaurantId ? { restaurantId, isAvailable: true } : { isAvailable: true };
  return MenuItem.find(query).lean();
};

export const getMenuItemById = async (id: string) => {
  const menuItem = await MenuItem.findOne({ _id: id, isAvailable: true }).lean();
  if (!menuItem) {
    throw new AppError('Menu item not found', 404);
  }
  return menuItem;
};

export const updateMenuItem = async (
  ownerId: string,
  id: string,
  updates: Partial<IMenuItem>,
  file?: Express.Multer.File
) => {
  const menuItem = await MenuItem.findById(id);
  if (!menuItem) {
    throw new AppError('Menu item not found', 404);
  }

  // Ensure authorization
  const restaurant = await Restaurant.findOne({ _id: menuItem.restaurantId, ownerId }).lean();
  if (!restaurant) {
    throw new AppError('Unauthorized', 403);
  }

  if (file) {
    // Delete old image if it exists
    if (menuItem.image) {
      await deleteImage(menuItem.image);
    }
    const newImageUrl = await uploadImage(file.buffer, 'menu_items');
    updates.image = newImageUrl;
  }

  const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).lean();
  return updatedMenuItem;
};

export const deleteMenuItem = async (ownerId: string, id: string) => {
  const menuItem = await MenuItem.findById(id);
  if (!menuItem) {
    throw new AppError('Menu item not found', 404);
  }

  const restaurant = await Restaurant.findOne({ _id: menuItem.restaurantId, ownerId }).lean();
  if (!restaurant) {
    throw new AppError('Unauthorized', 403);
  }

  // Delete image from Cloudinary
  if (menuItem.image) {
    await deleteImage(menuItem.image);
  }

  // Soft delete by setting isAvailable = false, and clear image URL.
  // We can also fully delete depending on requirements, but the prompt says soft delete.
  const deletedItem = await MenuItem.findByIdAndUpdate(id, { isAvailable: false, image: null }, { new: true }).lean();
  return { message: 'Menu item deleted successfully' };
};
