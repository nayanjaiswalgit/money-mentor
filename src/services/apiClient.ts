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

// Generic fetch wrapper with error handling
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

  // Retrieve token from localStorage
  const token = localStorage.getItem("access");

  // Only set Content-Type if not uploading FormData
  let mergedHeaders = {
    ...API_CONFIG.headers,
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
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