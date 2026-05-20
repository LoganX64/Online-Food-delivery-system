import { apiClient } from './apiClient';

export interface Address {
  _id: string;
  userId: string;
  label: 'home' | 'work' | 'other';
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface CreateAddressPayload {
  label: 'home' | 'work' | 'other';
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  isDefault?: boolean;
}

export interface UpdateAddressPayload {
  label?: 'home' | 'work' | 'other';
  addressLine?: string;
  city?: string;
  state?: string;
  pincode?: string;
  isDefault?: boolean;
}

const BASE = '/addresses';

export const addressApi = {
  getAll: (): Promise<Address[]> =>
    apiClient<Address[]>(BASE, { method: 'GET' }),

  getById: (id: string): Promise<Address> =>
    apiClient<Address>(`${BASE}/${id}`, { method: 'GET' }),

  create: (data: CreateAddressPayload): Promise<Address> =>
    apiClient<Address>(BASE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateAddressPayload): Promise<Address> =>
    apiClient<Address>(`${BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id: string): Promise<{ message: string }> =>
    apiClient<{ message: string }>(`${BASE}/${id}`, { method: 'DELETE' }),
};
