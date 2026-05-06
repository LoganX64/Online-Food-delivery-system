import { Order } from '../models/Order.js';
import { Cart } from '../models/Cart.js';
import { Address } from '../models/Address.js';
import { Payment } from '../models/Payment.js';
import { AppError } from '../utils/AppError.js';
import mongoose from 'mongoose';

/**
 * Create new orders from user cart.
 */
export const placeOrderFromCart = async (userId: string, addressId: string) => {
  const cart = await Cart.findOne({ userId }).lean();
  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  const address = await Address.findOne({ _id: addressId, userId }).lean();
  if (!address) {
    throw new AppError('Delivery address not found', 404);
  }

  const addressSnapshot = {
    addressLine: address.addressLine,
    city: address.city,
    pincode: address.pincode,
  };

  // Group items by restaurantId
  const itemsByRestaurant: { [key: string]: any[] } = {};
  cart.items.forEach((item: any) => {
    const rId = item.restaurantId.toString();
    if (!itemsByRestaurant[rId]) {
      itemsByRestaurant[rId] = [];
    }
    itemsByRestaurant[rId].push(item);
  });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const createdOrders = [];
    let grandTotalAmount = 0;

    for (const restaurantId in itemsByRestaurant) {
      const restaurantItems = itemsByRestaurant[restaurantId];
      const restaurantTotal = restaurantItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      grandTotalAmount += restaurantTotal;

      const order = new Order({
        userId,
        restaurantId,
        items: restaurantItems.map((item: any) => ({
          menuItemId: item.menuItemId,
          name: item.name,
          priceAtOrder: item.price,
          quantity: item.quantity
        })),
        totalAmount: restaurantTotal,
        addressSnapshot,
        status: 'created', // Customer created order
      });

      await order.save({ session });
      createdOrders.push(order);
    }

    // Create a mock payment record
    const payment = new Payment({
      userId,
      orderIds: createdOrders.map(o => o._id),
      amount: grandTotalAmount,
      status: 'PENDING',
      method: 'MOCK',
    });
    await payment.save({ session });

    // Update orders with payment ID
    for (const order of createdOrders) {
      order.paymentId = payment._id as mongoose.Types.ObjectId;
      await order.save({ session });
    }

    // Clear cart
    await Cart.findOneAndUpdate({ userId }, { items: [] }, { session });

    await session.commitTransaction();
    session.endSession();

    return { orders: createdOrders, paymentId: payment._id };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

/**
 * Get all orders for a customer.
 */
export const getCustomerOrders = async (userId: string) => {
  return Order.find({ userId }).sort({ createdAt: -1 }).lean();
};

/**
 * Get a single order for a customer.
 */
export const getOrderDetails = async (userId: string, orderId: string) => {
  const order = await Order.findOne({ _id: orderId, userId }).lean();
  if (!order) {
    throw new AppError('Order not found', 404);
  }
  return order;
};
