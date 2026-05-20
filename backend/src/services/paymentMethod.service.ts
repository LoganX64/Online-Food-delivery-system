import { PaymentMethod, IPaymentMethod } from '../models/PaymentMethod.js';
import { AppError } from '../utils/AppError.js';

/**
 * Fetch all payment methods for the authenticated user.
 */
export const getUserPaymentMethods = async (userId: string) => {
  return PaymentMethod.find({ userId }).sort({ isDefault: -1, createdAt: -1 }).lean();
};

/**
 * Add a new payment method. If isDefault is true, clears the default
 * flag from all other methods first.
 */
export const addPaymentMethod = async (
  userId: string,
  data: Pick<IPaymentMethod, 'provider' | 'token'> & { last4?: string; isDefault?: boolean }
) => {
  if (data.isDefault) {
    await PaymentMethod.updateMany({ userId }, { isDefault: false });
  }

  const method = new PaymentMethod({ ...data, userId });
  await method.save();
  return method.toObject();
};

/**
 * Update a payment method. Ownership is validated before update.
 */
export const updatePaymentMethod = async (
  userId: string,
  id: string,
  data: Partial<Pick<IPaymentMethod, 'provider' | 'last4' | 'token' | 'isDefault'>>
) => {
  const existing = await PaymentMethod.findOne({ _id: id, userId });
  if (!existing) throw new AppError('Payment method not found or access denied', 404);

  if (data.isDefault) {
    await PaymentMethod.updateMany({ userId }, { isDefault: false });
  }

  const updated = await PaymentMethod.findByIdAndUpdate(id, data, {
    returnDocument: 'after',
    runValidators: true,
  }).lean();

  return updated;
};

/**
 * Delete a payment method. Ownership is validated before deletion.
 */
export const deletePaymentMethod = async (userId: string, id: string) => {
  const existing = await PaymentMethod.findOne({ _id: id, userId });
  if (!existing) throw new AppError('Payment method not found or access denied', 404);

  await PaymentMethod.findByIdAndDelete(id);
  return { message: 'Payment method deleted successfully' };
};
