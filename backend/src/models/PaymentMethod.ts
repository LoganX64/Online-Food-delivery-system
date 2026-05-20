import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentMethod extends Document {
  userId: mongoose.Types.ObjectId;
  provider: string;
  last4?: string;
  token: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentMethodSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: String, required: true, trim: true },
    last4: { type: String, trim: true },
    token: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PaymentMethod = mongoose.model<IPaymentMethod>('PaymentMethod', PaymentMethodSchema);
