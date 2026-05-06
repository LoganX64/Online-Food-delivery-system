import { z } from 'zod';

// ─── User Schemas ────────────────────────────────────────────

export const userCreateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    role: z.enum(['customer', 'restaurantOwner', 'admin']).default('customer'),
    profileImage: z.string().url('Invalid URL for profile image').optional(),
    phone: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, 'Phone must be 10-15 digits, optionally starting with +')
      .optional(),
    isActive: z.boolean().default(true),
  }),
});

export const userUpdateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name cannot be empty').optional(),
    phone: z
      .string()
      .regex(/^\+?[0-9]{10,15}$/, 'Phone must be 10-15 digits, optionally starting with +')
      .optional(),
    profileImage: z.string().url('Invalid URL for profile image').optional(),
    role: z.enum(['customer', 'restaurantOwner', 'admin']).optional(),
    isActive: z.boolean().optional(),
  }),
});

// ─── Auth Schemas ────────────────────────────────────────────

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').trim().toLowerCase(),
    password: z.string().min(1, 'Password is required'),
  }),
});

// ─── Address Schemas ─────────────────────────────────────────

export const addressCreateSchema = z.object({
  body: z.object({
    label: z.enum(['home', 'work', 'other'], {
      message: 'Label must be home, work, or other',
    }),
    addressLine: z.string().trim().min(1, 'Address line is required'),
    city: z.string().trim().min(1, 'City is required'),
    state: z.string().trim().min(1, 'State is required'),
    pincode: z.string().trim().min(1, 'Pincode is required'),
    isDefault: z.boolean().default(false),
  }),
});

export const addressUpdateSchema = z.object({
  body: z.object({
    label: z.enum(['home', 'work', 'other']).optional(),
    addressLine: z.string().trim().min(1, 'Address line cannot be empty').optional(),
    city: z.string().trim().min(1, 'City cannot be empty').optional(),
    state: z.string().trim().min(1, 'State cannot be empty').optional(),
    pincode: z.string().trim().min(1, 'Pincode cannot be empty').optional(),
    isDefault: z.boolean().optional(),
  }),
});
