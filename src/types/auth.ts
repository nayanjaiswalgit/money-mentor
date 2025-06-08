export type UserRole = 'admin' | 'user' | 'premium' | 'basic' | 'enterprise';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription: Subscription;
  features: string[];
}

export interface Subscription {
  id: string;
  plan: 'free' | 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'inactive' | 'expired';
  startDate: string;
  endDate: string;
  features: string[];
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  roles: UserRole[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
} 