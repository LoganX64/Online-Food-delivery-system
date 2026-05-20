import { apiClient } from './apiClient';

export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'promotion';
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

const BASE = '/notifications';

export const notificationApi = {
  getAll: (): Promise<Notification[]> =>
    apiClient<Notification[]>(BASE, { method: 'GET' }),

  create: (data: {
    title: string;
    message: string;
    type?: Notification['type'];
  }): Promise<Notification> =>
    apiClient<Notification>(BASE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  markAsRead: (id: string): Promise<Notification> =>
    apiClient<Notification>(`${BASE}/${id}/read`, { method: 'PUT' }),

  markAllAsRead: (): Promise<{ message: string }> =>
    apiClient<{ message: string }>(`${BASE}/read-all`, { method: 'PUT' }),

  remove: (id: string): Promise<{ message: string }> =>
    apiClient<{ message: string }>(`${BASE}/${id}`, { method: 'DELETE' }),
};
