import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  orderIds: mongoose.Types.ObjectId[];
  amount: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  method: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderIds: [{ type: Schema.Types.ObjectId, ref: 'Order', required: true }],
    amount: { type: Number, required: true },
    status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
    method: { type: String, default: 'MOCK' },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
