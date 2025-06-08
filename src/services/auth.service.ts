import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, LoginCredentials, RegisterData, User } from '../types/auth';

const TOKEN_KEY = 'auth_token';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class AuthService {
  private token: string | null = null;

  constructor() {
    this.token = Cookies.get(TOKEN_KEY) || null;
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: AuthResponse = await response.json();
      this.setToken(data.token);
      return data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const authData: AuthResponse = await response.json();
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