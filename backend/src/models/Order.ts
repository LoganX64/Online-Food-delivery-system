import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  menuItemId: mongoose.Types.ObjectId;
  name: string;
  priceAtOrder: number;
  quantity: number;
}

export interface IAddressSnapshot {
  addressLine: string;
  city: string;
  pincode: string;
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  paymentId?: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  status: 'created' | 'placed' | 'accepted' | 'preparing' | 'out_for_delivery' | 'delivered' | 'rejected' | 'cancelled';
  addressSnapshot: IAddressSnapshot;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' },
    items: [
      {
        menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        name: { type: String, required: true },
        priceAtOrder: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['created', 'placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'rejected', 'cancelled'],
      default: 'created',
    },
    addressSnapshot: {
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
