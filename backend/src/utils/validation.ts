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

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address').trim().toLowerCase(),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
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

// ─── Category Schemas ────────────────────────────────────────

export const categoryCreateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Category name is required'),
    description: z.string().trim().optional(),
  }),
});

export const categoryUpdateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Category name cannot be empty').optional(),
    description: z.string().trim().optional(),
    isActive: z.boolean().optional(),
  }),
});

// ─── Restaurant Schemas ──────────────────────────────────────

export const restaurantCreateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Restaurant name is required'),
    description: z.string().trim().optional(),
    addressLine: z.string().trim().min(1, 'Address line is required'),
    city: z.string().trim().min(1, 'City is required'),
    state: z.string().trim().min(1, 'State is required'),
    pincode: z.string().trim().min(1, 'Pincode is required'),
    isActive: z.boolean().default(true),
  }),
});

export const restaurantUpdateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Restaurant name cannot be empty').optional(),
    description: z.string().trim().optional(),
    addressLine: z.string().trim().min(1, 'Address line cannot be empty').optional(),
    city: z.string().trim().min(1, 'City cannot be empty').optional(),
    state: z.string().trim().min(1, 'State cannot be empty').optional(),
    pincode: z.string().trim().min(1, 'Pincode cannot be empty').optional(),
    isActive: z.boolean().optional(),
  }),
});

// ─── Order Schemas ───────────────────────────────────────────

export const orderStatusUpdateSchema = z.object({
  body: z.object({
    status: z.enum([
      'created',
      'placed',
      'accepted',
      'preparing',
      'out_for_delivery',
      'delivered',
      'rejected',
      'cancelled',
    ]),
  }),
});

// ─── Menu Schemas ────────────────────────────────────────────

export const menuCreateSchema = z.object({
  body: z.object({
    restaurantId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid restaurant ID'),
    name: z.string().trim().min(1, 'Menu item name is required'),
    description: z.string().trim().optional(),
    price: z.coerce.number().min(0, 'Price must be a positive number'),
    category: z.string().trim().min(1, 'Category is required'),
    isAvailable: z.coerce.boolean().default(true),
  }),
});

export const menuUpdateSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Menu item name cannot be empty').optional(),
    description: z.string().trim().optional(),
    price: z.coerce.number().min(0, 'Price must be a positive number').optional(),
    category: z.string().trim().min(1, 'Category cannot be empty').optional(),
    isAvailable: z.coerce.boolean().optional(),
  }),
});
export const orderUpdateSchema = z.object({
  body: z.object({
    status: z.enum(['created', 'placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'rejected', 'cancelled']),
  }),
});

export const orderCreateSchema = z.object({
  body: z.object({
    items: z.array(z.object({
      menuItemId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid menu item ID'),
      restaurantId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid restaurant ID'),
      name: z.string().min(1, 'Item name is required'),
      priceAtOrder: z.number().min(0, 'Price must be positive'),
      quantity: z.number().int().min(1, 'Quantity must be at least 1'),
    })).min(1, 'Order must have at least one item'),
    addressSnapshot: z.object({
      addressLine: z.string().min(1, 'Address line is required'),
      city: z.string().min(1, 'City is required'),
      pincode: z.string().min(1, 'Pincode is required'),
    }),
    totalAmount: z.number().min(0, 'Total amount must be positive'),
  }),
});
export const orderFromCartSchema = z.object({
  body: z.object({
    addressId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid address ID'),
  }),
});

// ─── Cart Schemas ────────────────────────────────────────────

export const cartItemSchema = z.object({
  body: z.object({
    menuItemId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid menu item ID'),
    quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  }),
});

export const cartRemoveSchema = z.object({
  body: z.object({
    menuItemId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid menu item ID'),
  }),
});

// ─── Auth — Update Password ───────────────────────────────────

const passwordStrengthSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const updatePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: passwordStrengthSchema,
  }),
});

// ─── Payment Method Schemas ───────────────────────────────────

export const paymentMethodCreateSchema = z.object({
  body: z.object({
    provider: z.string().trim().min(1, 'Provider is required'),
    last4: z
      .string()
      .regex(/^\d{4}$/, 'last4 must be exactly 4 digits')
      .optional(),
    token: z.string().trim().min(1, 'Token/reference is required'),
    isDefault: z.boolean().optional(),
  }),
});

export const paymentMethodUpdateSchema = z.object({
  body: z.object({
    provider: z.string().trim().min(1, 'Provider cannot be empty').optional(),
    last4: z
      .string()
      .regex(/^\d{4}$/, 'last4 must be exactly 4 digits')
      .optional(),
    token: z.string().trim().min(1, 'Token cannot be empty').optional(),
    isDefault: z.boolean().optional(),
  }),
});

// ─── Notification Schemas ─────────────────────────────────────

export const notificationCreateSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'Title is required'),
    message: z.string().trim().min(1, 'Message is required'),
    type: z.enum(['success', 'info', 'warning', 'promotion']).default('info'),
  }),
});
