export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL || '';

/**
 * Custom AppError for API requests.
 */
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Standard fetch wrapper that ensures credentials are included for HTTP-only cookies
 * and standardizes error handling.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Default options including credentials for secure cookies
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // CRITICAL: Must be include to send HTTP-only JWT cookies automatically
    credentials: 'include',
  };

  // If body is FormData (e.g. for image uploads), we must not set Content-Type to application/json
  // Let the browser automatically set the multipart/form-data boundary
  if (options.body instanceof FormData) {
    if (config.headers) {
      const headers = config.headers as Record<string, string>;
      delete headers['Content-Type'];
    }
  }

  try {
    const response = await fetch(url, config);

    // Some endpoints might return 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || data.message || 'An unexpected error occurred',
        response.status,
        data
      );
    }

    // The backend standardizes responses as { success: true, data: T }
    // Or sometimes just returns the data. We'll return the data payload if wrapped.
    if (data && data.success !== undefined && data.data !== undefined) {
      return data.data as T;
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network errors or JSON parsing errors
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error occurred',
      500
    );
  }
}
