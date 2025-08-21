import { ApiResponse } from '../types';

// API configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/fintrack',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
};

// Custom error class for API errors
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

// Token management
const getToken = () => localStorage.getItem("access");
const getRefreshToken = () => localStorage.getItem("refresh");

const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

// Refresh token function
async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new ApiError('No refresh token available', 401);
  }

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new ApiError('Failed to refresh token', response.status);
    }

    const data = await response.json();
    localStorage.setItem("access", data.access);
    return data.access;
  } catch (error) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    throw new ApiError('Session expired', 401);
  }
}

// Generic fetch wrapper with error handling
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  requireAuth: boolean = true
): Promise<T> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  let token = getToken();
  
  // Check if token is expired and refresh if needed
  if (requireAuth) {
    if (!token) {
      throw new ApiError('Authentication required', 401);
    }
    
    if (isTokenExpired(token)) {
      try {
        token = await refreshAccessToken();
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        throw new ApiError('Authentication failed', 401);
      }
    }
  }

  // Only set Content-Type if not uploading FormData
  let mergedHeaders = {
    ...API_CONFIG.headers,
    ...options.headers,
    ...(token && requireAuth ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Filter to only string key-value pairs
  let headers: Record<string, string> = Object.fromEntries(
    Object.entries(mergedHeaders).filter(
      ([k, v]) => typeof k === 'string' && typeof v === 'string'
    )
  );

  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle 401 Unauthorized
      if (response.status === 401 && requireAuth) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = '/login';
        throw new ApiError('Session expired', 401);
      }
      
      throw new ApiError(
        errorData.message || 'An error occurred',
        response.status,
        errorData
      );
    }
    
    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Request timeout', 408);
      }
      throw new ApiError(error.message, 500);
    }
    
    throw new ApiError('Unknown error occurred', 500);
  }
}

// Helper function to handle API responses
export function handleApiResponse<T>(response: T): ApiResponse<T> {
  return {
    data: response,
    status: 200,
    message: 'Success',
  };
} 