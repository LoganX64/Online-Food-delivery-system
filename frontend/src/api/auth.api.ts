import { apiClient } from './apiClient';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'restaurantOwner' | 'admin';
  phone?: string;
  profileImage?: string;
  isActive: boolean;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role?: 'customer' | 'restaurantOwner' | 'admin';
  phone?: string;
}

export const authApi = {
  /**
   * Log in user and receive JWT via HTTP-only cookie.
   */
  login: async (credentials: LoginCredentials): Promise<{ token: string; user: User }> => {
    return apiClient<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * Register a new user account.
   */
  register: async (data: RegisterCredentials): Promise<User> => {
    return apiClient<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Log out user (clears HTTP-only cookie on the backend).
   */
  logout: async (): Promise<{ message: string }> => {
    return apiClient<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  },

  /**
   * Fetch current authenticated user based on HTTP-only cookie session.
   */
  getMe: async (): Promise<User> => {
    return apiClient<User>('/auth/me', {
      method: 'GET',
    });
  },
};
