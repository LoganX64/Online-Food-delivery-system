import { apiClient } from './apiClient';

export interface Category {
  _id: string;
  restaurantId: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Get all categories for the logged-in owner's restaurant.
 */
export const getMyCategories = async (): Promise<Category[]> => {
  return apiClient<Category[]>('/categories/me');
};

/**
 * Create a new category for the owner's restaurant.
 */
export const createCategory = async (data: { name: string; description?: string }): Promise<Category> => {
  return apiClient<Category>('/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Update a category by ID.
 */
export const updateCategoryApi = async (id: string, data: { name?: string; description?: string }): Promise<Category> => {
  return apiClient<Category>(`/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Delete a category by ID.
 */
export const deleteCategoryApi = async (id: string): Promise<void> => {
  await apiClient<void>(`/categories/${id}`, {
    method: 'DELETE',
  });
};
