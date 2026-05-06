import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  menuItemId: mongoose.Types.ObjectId;
  restaurantId: mongoose.Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
}

const CartSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [
      {
        menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>('Cart', CartSchema);
