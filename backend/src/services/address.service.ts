import { Address, IAddress } from '../models/Address.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

/**
 * Create a new address for a user.
 * If isDefault is true, unsets default on all other addresses for this user.
 */
export const createAddress = async (userId: string, data: Partial<IAddress>) => {
  // Verify user exists
  const userExists = await User.findById(userId).lean();
  if (!userExists) {
    throw new AppError('User not found', 404);
  }

  // If setting as default, unset any existing default
  if (data.isDefault) {
    await Address.updateMany({ userId, isDefault: true }, { isDefault: false });
  }

  const address = new Address({ ...data, userId });
  await address.save();
  return address.toObject();
};

/**
 * Get all addresses belonging to a user.
 */
export const getAddressesByUserId = async (userId: string) => {
  return Address.find({ userId }).lean();
};

/**
 * Get a single address by ID, scoped to the user.
 */
export const getAddressById = async (userId: string, addressId: string) => {
  const address = await Address.findOne({ _id: addressId, userId }).lean();
  if (!address) throw new AppError('Address not found', 404);
  return address;
};

/**
 * Update an address by ID, scoped to the user.
 * If isDefault is being set to true, unsets default on other addresses.
 */
export const updateAddress = async (userId: string, addressId: string, updates: Partial<IAddress>) => {
  // If setting as default, unset others first
  if (updates.isDefault) {
    await Address.updateMany(
      { userId, isDefault: true, _id: { $ne: addressId } },
      { isDefault: false }
    );
  }

  const address = await Address.findOneAndUpdate(
    { _id: addressId, userId },
    updates,
    { new: true, runValidators: true }
  ).lean();

  if (!address) throw new AppError('Address not found', 404);
  return address;
};

/**
 * Delete an address by ID, scoped to the user.
 * This is a hard delete since addresses are not soft-deleted.
 */
export const deleteAddress = async (userId: string, addressId: string) => {
  const address = await Address.findOneAndDelete({ _id: addressId, userId });
  if (!address) throw new AppError('Address not found', 404);
  return { message: 'Address deleted successfully' };
};
