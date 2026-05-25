import { apiClient } from './apiClient';

export interface MenuItem {
  _id: string;
  restaurantId: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const getRestaurantMenu = async (restaurantId: string): Promise<MenuItem[]> => {
  return apiClient<MenuItem[]>(`/restaurants/${restaurantId}/menu`);
};

export const createMenuItem = async (formData: FormData): Promise<MenuItem> => {
  return apiClient<MenuItem>('/menu', {
    method: 'POST',
    body: formData
  });
};

export const updateMenuItem = async (id: string, formData: FormData): Promise<MenuItem> => {
  return apiClient<MenuItem>(`/menu/${id}`, {
    method: 'PUT',
    body: formData
  });
};

export const deleteMenuItem = async (id: string): Promise<void> => {
  await apiClient<void>(`/menu/${id}`, {
    method: 'DELETE'
  });
};
