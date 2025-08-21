import { API_URL } from '../../config';
import { 
  User, 
  LoginCredentials, 
  RegisterData, 
  UserRole,
  AuthResponse 
} from '../../types/auth';
import { fetchApi } from '../../services/apiClient';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

// Re-export the types for consistency
export type { User, UserRole, LoginCredentials, RegisterData };

// Type guard to check if an object is a valid User
const isUser = (data: unknown): data is User => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'username' in data &&
    'email' in data &&
    'first_name' in data &&
    'last_name' in data
  );
};

class AuthService {
  private csrfToken: string | null = null;

  private async getHeaders(includeAuth = true): Promise<Headers> {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    if (includeAuth) {
      const csrfToken = await this.getCsrfToken();
      if (csrfToken) {
        headers.append('X-CSRFToken', csrfToken);
      }
    }

    return headers;
  }

  // Helper function to get a cookie by name
  private getCookie(name: string): string | null {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
    return cookieValue ? decodeURIComponent(cookieValue.split('=')[1]) : null;
  }

  private async getCsrfToken(): Promise<string | null> {
    try {
      const data = await fetchApi<{ csrfToken: string }>(API_ENDPOINTS.CSRF, {
        method: 'GET',
        credentials: 'include',
      }, false);
      let csrf = this.getCookie('csrftoken');
      if (csrf) {
        return csrf;
      }
      return data.csrfToken || null;
    } catch (error) {
      console.error('Error getting CSRF token:', error);
      return null;
    }
  }

  private async ensureCsrfToken(): Promise<void> {
    try {
      const data = await fetchApi<{ csrfToken: string }>(API_ENDPOINTS.CSRF, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        },
      }, false);
      if (!data.csrfToken) {
        throw new Error('No CSRF token in response');
      }
      this.csrfToken = data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      throw error;
    }
  }

  private async fetchWithCsrf(url: string, options: RequestInit = {}): Promise<any> {
    if (!this.csrfToken) {
      await this.ensureCsrfToken();
    }
    const headers = new Headers(options.headers);
    headers.set('X-CSRFToken', this.csrfToken || '');
    headers.set('Content-Type', 'application/json');
    const data = await fetchApi(url, {
      ...options,
      credentials: 'include',
      headers,
    });
    return data;
  }

/**
 * Check if the user is authenticated by making a request to the server
 * This will automatically handle the session cookie
 */
  async checkAuthStatus(): Promise<{ isAuthenticated: boolean; user: User | null }> {
  try {
      const headers = await this.getHeaders();
      const response = await fetchApi<User>(API_ENDPOINTS.PROFILE, {
      method: 'GET',
        headers,
        credentials: 'include',
    });

    if (response.ok) {
      const user = await response.json();
      if (isUser(user)) {
        return { isAuthenticated: true, user };
      }
    }
    
    return { isAuthenticated: false, user: null };
  } catch (error) {
    console.error('Error checking auth status:', error);
    return { isAuthenticated: false, user: null };
  }
  }

  /**
   * Login with email/username and password
   * The server will set the session cookie automatically
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.fetchWithCsrf(API_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Login failed');
    }

    const data = await response.json();
    return {
      user: data.user,
    };
  }

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await this.fetchWithCsrf(API_ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Registration failed');
    }

    const responseData = await response.json();
    return {
      user: responseData.user,
    };
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    const response = await this.fetchWithCsrf(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Logout failed');
    }

    this.csrfToken = null;
  }

  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await this.fetchWithCsrf(API_ENDPOINTS.PROFILE, {
        method: 'GET',
      });

      if (!response.ok) {
        if (response.status === 401) {
          return null;
        }
        const error = await response.json();
        throw new Error(error.detail || 'Failed to get user data');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Get the current user (alias for getCurrentUser for backward compatibility)
   */
  async getUser(): Promise<User | null> {
    try {
      const response = await this.getCurrentUser();
      return response;
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  /**
   * Get the current user's token
   */
  async getToken(): Promise<string> {
    // Since we're using session-based auth, we don't need to return a token
    return '';
  }

  /**
   * Check if user has a specific role
   */
  async hasRole(role: string): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user?.role === role;
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const response = await this.getCurrentUser();
      return !!response;
    } catch (error) {
      return false;
    }
  }

  /**
   * Fetch with authentication and CSRF protection
   */
  async fetchWithAuth(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const headers = await this.getHeaders();
    const response = await fetchApi(input, {
      ...init,
      headers: {
        ...headers,
        ...init?.headers,
      },
      credentials: 'include',
    });

    if (response.status === 401) {
      // Try to refresh the session
      try {
        await this.getCurrentUser();
        // Retry the original request
        return this.fetchWithAuth(input, init);
      } catch (error) {
        throw new Error('Session expired');
      }
    }

    return response;
  }
}

export default new AuthService();
