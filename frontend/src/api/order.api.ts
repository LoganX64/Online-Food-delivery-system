import { apiClient } from './apiClient';

export interface OrderItem {
  menuItemId: string;
  name: string;
  priceAtOrder: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  restaurantId: string | { _id: string; name: string };
  items: OrderItem[];
  totalAmount: number;
  status:
    | 'created'
    | 'placed'
    | 'accepted'
    | 'preparing'
    | 'out_for_delivery'
    | 'delivered'
    | 'rejected'
    | 'cancelled';
  addressSnapshot: {
    addressLine: string;
    city: string;
    pincode: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const orderApi = {
  /**
   * Fetch all orders belonging to the authenticated customer.
   * Backend derives userId from HTTP-only cookie.
   */
  getMyOrders: (): Promise<Order[]> =>
    apiClient<Order[]>('/orders', { method: 'GET' }),

  /**
   * Fetch a single order by ID (must belong to authenticated user).
   */
  getOrderById: (id: string): Promise<Order> =>
    apiClient<Order>(`/orders/${id}`, { method: 'GET' }),
};
