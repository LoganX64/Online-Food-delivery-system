import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  userId: mongoose.Types.ObjectId;
  label: 'home' | 'work' | 'other';
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: Date;
}

const AddressSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    label: { type: String, enum: ['home', 'work', 'other'], required: true },
    addressLine: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Address = mongoose.model<IAddress>('Address', AddressSchema);
