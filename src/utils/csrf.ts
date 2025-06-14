import store from '../app/store';
import { logoutUser } from '../features/auth/authSlice';

/**
 * Utility functions for handling CSRF tokens
 */

// Cache the CSRF token to avoid multiple requests
let csrfToken: string | null = null;
let isFetchingToken = false;

// Global variable to track if we're already handling a 401
let isHandling401 = false;

// Remove the /api suffix since it's already included in the endpoint paths
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Handles 401 Unauthorized responses by dispatching a logout action
 */
export const handleUnauthorized = () => {
  if (!isHandling401) {
    isHandling401 = true;
    console.log('[Auth] Handling 401 Unauthorized - Logging out');
    store.dispatch(logoutUser());
    // Reset the flag after a short delay to prevent multiple dispatches
    setTimeout(() => {
      isHandling401 = false;
    }, 1000);
  }
};

/**
 * Get the CSRF token from the cookie
 */
export const getCSRFToken = async (): Promise<string> => {
  // If we're already fetching a token, wait for it
  if (isFetchingToken) {
    console.log('[CSRF] Already fetching token, waiting...');
    // Wait for up to 5 seconds for the token
    for (let i = 0; i < 50; i++) {
  if (csrfToken) {
    return csrfToken;
  }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error('Timeout waiting for CSRF token');
  }

  // First try to get the token from the cookie
  const cookies = document.cookie.split(';');
  const csrfCookie = cookies.find(cookie => cookie.trim().startsWith('csrftoken='));
  
  if (csrfCookie) {
    const token = csrfCookie.split('=')[1].trim();
    if (token) {
      console.log('[CSRF] Found token in cookie');
      csrfToken = token;
      return token;
    }
  }

  // If no token in cookie or token is empty, make a request to get one
  try {
    isFetchingToken = true;
    console.log('[CSRF] Fetching new CSRF token...');
    const response = await fetch(`${API_BASE_URL}/api/auth/csrf/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('[CSRF] Failed to get CSRF token:', response.status, response.statusText);
      throw new Error(`Failed to get CSRF token: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const token = data.csrfToken;

    if (!token) {
      console.error('[CSRF] No token in response');
      throw new Error('No CSRF token in response');
    }

    console.log('[CSRF] Successfully obtained new CSRF token');
    csrfToken = token;
    return token;
  } catch (error) {
    console.error('[CSRF] Error getting CSRF token:', error);
    throw error;
  } finally {
    isFetchingToken = false;
  }
};

/**
 * Clear the CSRF token
 */
export const clearCSRFToken = (): void => {
  console.log('[CSRF] Clearing CSRF token');
  document.cookie = 'csrftoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  csrfToken = null;
};

/**
 * Fetch wrapper that automatically includes CSRF token
 */
export const fetchWithCSRF = async (url: string, options: RequestInit = {}): Promise<Response> => {
  try {
    // Always get a fresh token for POST, PUT, DELETE requests
    const method = options.method?.toUpperCase() || 'GET';
    const needsCSRF = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method);
    
    let token = csrfToken;
    if (needsCSRF) {
      try {
        token = await getCSRFToken();
      } catch (error) {
        console.error('[CSRF] Failed to get CSRF token for request:', error);
        throw error;
      }
    }
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(needsCSRF && token ? { 'X-CSRFToken': token } : {}),
      ...options.headers,
    };

    console.log(`[CSRF] Making ${method} request to ${url} with CSRF token:`, needsCSRF ? 'Yes' : 'No');
    const response = await fetch(url, {
      ...options,
      credentials: 'include',
      headers,
    });
    
    // If we get a 403 Forbidden, it might be due to an invalid CSRF token
    if (response.status === 403) {
      console.log('[CSRF] Received 403 Forbidden, clearing CSRF token and retrying...');
      clearCSRFToken();
      try {
      const newToken = await getCSRFToken();
      if (newToken) {
          console.log('[CSRF] Retrying request with new CSRF token');
        return fetchWithCSRF(url, options);
        }
      } catch (error) {
        console.error('[CSRF] Failed to get new CSRF token for retry:', error);
        throw error;
      }
    }
    
    return response;
  } catch (error) {
    console.error('[CSRF] Error in fetchWithCSRF:', error);
    throw error;
  }
};

/**
 * Ensures we have a valid CSRF token (alias for getCSRFToken)
 * @returns {Promise<string>} The CSRF token
 * @deprecated Use getCSRFToken() directly instead
 */
export const ensureCSRFToken = getCSRFToken;
