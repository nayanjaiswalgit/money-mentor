import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types/auth';
import { fetchApi } from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const TOKEN_KEY = 'auth_token';

class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = Cookies.get(TOKEN_KEY) || null;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const data: AuthResponse = await fetchApi(
        API_ENDPOINTS.LOGIN,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        },
        false // login does not require auth
      );
      this.setToken(data.token);
      return data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const authData: AuthResponse = await fetchApi(
        API_ENDPOINTS.REGISTER,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
        false // register does not require auth
      );
      this.setToken(authData.token);
      return authData;
    } catch (error) {
      throw new Error('Registration failed');
    }
  }

  logout(): void {
    this.token = null;
    Cookies.remove(TOKEN_KEY);
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
    Cookies.set(TOKEN_KEY, token, { expires: 7 }); // Token expires in 7 days
  }

  isAuthenticated(): boolean {
    if (!this.token) return false;
    try {
      const decoded = jwtDecode(this.token);
      return decoded.exp ? decoded.exp * 1000 > Date.now() : false;
    } catch {
      return false;
    }
  }

  getUser(): User | null {
    if (!this.token) return null;
    try {
      const decoded = jwtDecode(this.token);
      return decoded as User;
    } catch {
      return null;
    }
  }

  hasFeature(featureName: string): boolean {
    const user = this.getUser();
    return user?.features.includes(featureName) || false;
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }
}

export const authService = new AuthService(); 