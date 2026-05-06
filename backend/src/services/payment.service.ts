import { Payment } from '../models/Payment.js';
import { Order } from '../models/Order.js';
import { AppError } from '../utils/AppError.js';
import mongoose from 'mongoose';

/**
 * Handle a mock payment webhook to update the status of an order/payment.
 */
export const handlePaymentWebhook = async (paymentId: string, status: 'SUCCESS' | 'FAILED') => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const payment = await Payment.findById(paymentId).session(session);
    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    if (payment.status !== 'PENDING') {
      // Idempotency check: if already processed, return gracefully
      await session.abortTransaction();
      session.endSession();
      return { message: 'Payment already processed' };
    }

    payment.status = status;
    await payment.save({ session });

    // If payment fails, mark orders as cancelled or rejected
    // If successful, leave as 'created' (to be accepted by restaurant) or change to 'placed'
    const newOrderStatus = status === 'SUCCESS' ? 'placed' : 'cancelled';

    await Order.updateMany(
      { _id: { $in: payment.orderIds } },
      { status: newOrderStatus },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return { message: `Payment ${status.toLowerCase()}` };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
