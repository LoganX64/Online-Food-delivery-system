import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  restaurantId: mongoose.Types.ObjectId;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Ensure unique category names per restaurant
CategorySchema.index({ restaurantId: 1, name: 1 }, { unique: true });

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
