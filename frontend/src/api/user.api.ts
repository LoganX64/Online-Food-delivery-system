import { apiClient } from './apiClient';
import type { User } from './auth.api';

/**
 * Fetch current authenticated user's profile.
 */
export const getMyProfile = (): Promise<User> =>
  apiClient<User>('/users/me', { method: 'GET' });

/**
 * Update the authenticated user's profile (name, phone).
 * Backend strips role/isActive — safe to call with partial data.
 */
export const updateMyProfile = (data: { name?: string; phone?: string }): Promise<User> =>
  apiClient<User>('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

/**
 * Upload a new profile image. Sends as multipart/form-data.
 * The apiClient strips Content-Type when body is FormData.
 */
export const uploadMyProfileImage = (file: File): Promise<User> => {
  const form = new FormData();
  form.append('image', file);
  return apiClient<User>('/users/profile-image', {
    method: 'POST',
    body: form,
  });
};

/**
 * Change password while authenticated.
 */
export const updateMyPassword = (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ message: string }> =>
  apiClient<{ message: string }>('/auth/update-password', {
    method: 'PUT',
    body: JSON.stringify(data),
  });

/**
 * Send forgot-password email (always returns success to prevent enumeration).
 */
export const forgotPassword = (email: string): Promise<{ message: string }> =>
  apiClient<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

/**
 * Reset password using token from the reset link.
 */
export const resetPassword = (
  token: string,
  password: string
): Promise<{ message: string }> =>
  apiClient<{ message: string }>(`/auth/reset-password/${token}`, {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
