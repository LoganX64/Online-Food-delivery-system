import { z } from 'zod';

export const userCreateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['customer', 'restaurantOwner', 'admin']).default('customer'),
    profileImage: z.string().url('Invalid URL for profile image').optional(),
    phone: z.string().min(10, 'Phone number should be at least 10 digits').optional(),
    isActive: z.boolean().default(true),
  }),
});

export const userUpdateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).optional(),
    phone: z.string().min(10, 'Phone number should be at least 10 digits').optional(),
    profileImage: z.string().url('Invalid URL for profile image').optional(),
    role: z.enum(['customer', 'restaurantOwner', 'admin']).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const addressCreateSchema = z.object({
  body: z.object({
    userId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid user ID'),
    label: z.enum(['home', 'work', 'other']),
    addressLine: z.string().min(1, 'Address line is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().min(1, 'Pincode is required'),
    isDefault: z.boolean().default(false),
  }),
});
