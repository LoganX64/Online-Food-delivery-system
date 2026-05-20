import { apiClient } from './apiClient';

export interface PaymentMethod {
  _id: string;
  userId: string;
  provider: string;
  last4?: string;
  token: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentMethodPayload {
  provider: string;
  last4?: string;
  token: string;
  isDefault?: boolean;
}

export interface UpdatePaymentMethodPayload {
  provider?: string;
  last4?: string;
  token?: string;
  isDefault?: boolean;
}

const BASE = '/payment-methods';

export const paymentMethodApi = {
  getAll: (): Promise<PaymentMethod[]> =>
    apiClient<PaymentMethod[]>(BASE, { method: 'GET' }),

  create: (data: CreatePaymentMethodPayload): Promise<PaymentMethod> =>
    apiClient<PaymentMethod>(BASE, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdatePaymentMethodPayload): Promise<PaymentMethod> =>
    apiClient<PaymentMethod>(`${BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  remove: (id: string): Promise<{ message: string }> =>
    apiClient<{ message: string }>(`${BASE}/${id}`, { method: 'DELETE' }),
};
