import { apiClient } from './apiClient';

export interface RestaurantOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface Restaurant {
  _id: string;
  ownerId: string;
  name: string;
  description?: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  contactEmail: string;
  contactPhone: string;
  cuisines: string[];
  imageUrl?: string;
  rating: number;
  totalRatings: number;
  isApproved: boolean;
  isActive: boolean;
  isDeleted: boolean;
}

export interface Order {
  _id: string;
  userId: any; // User object
  restaurantId: string;
  items: Array<{
    menuItemId: any;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  totalAmount: number;
  deliveryAddress: any;
  status: 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'HANDED_OFF' | 'DELIVERED' | 'CANCELLED' | 'REJECTED';
  rejectionReason?: string;
  rejectionNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EarningsSummary {
  totalEarnings: number;
  totalOrders: number;
}

export const getRestaurantMe = async (): Promise<Restaurant> => {
  return apiClient<Restaurant>('/restaurant/me');
};

export const updateRestaurantMe = async (data: Partial<Restaurant>): Promise<Restaurant> => {
  return apiClient<Restaurant>('/restaurant/me', {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const getRestaurantEarnings = async (): Promise<EarningsSummary> => {
  return apiClient<EarningsSummary>('/restaurant/earnings');
};

export const getRestaurantOrders = async (): Promise<Order[]> => {
  return apiClient<Order[]>('/restaurant/orders');
};

export const acceptOrder = async (orderId: string): Promise<Order> => {
  return apiClient<Order>(`/restaurant/orders/${orderId}/accept`, {
    method: 'PUT'
  });
};

export const rejectOrder = async (orderId: string, payload: { reason: string; note?: string }): Promise<Order> => {
  return apiClient<Order>(`/restaurant/orders/${orderId}/reject`, {
    method: 'PUT',
    body: JSON.stringify(payload)
  });
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<Order> => {
  return apiClient<Order>(`/restaurant/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
};
