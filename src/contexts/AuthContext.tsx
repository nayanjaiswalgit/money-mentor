import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '../types';
import { useLoginMutation, useGetUserProfileQuery, useLogoutMutation } from '../app/api/login';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (identifier: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  // Get user profile
  const { data: userProfile, isLoading: isProfileLoading, error: profileError } = useGetUserProfileQuery(undefined, {
    skip: !user, // Only fetch profile if we have a user in localStorage
  });

  // Update user state when profile changes
  useEffect(() => {
    if (!isProfileLoading) {
      if (profileError) {
        setUser(null);
        setAuthError('Failed to fetch user profile.');
        localStorage.removeItem('user');
      } else if (userProfile) {
        setUser(userProfile as User);
        setAuthError(null);
      }
      setLoading(false);
    }
  }, [userProfile, isProfileLoading, profileError]);

  const login = useCallback(async (identifier: string, password: string) => {
    try {
      setAuthError(null);
      setLoading(true);
      const result = await loginMutation({ identifier, password }).unwrap();
      if (result.success && result.data?.user) {
        const userData = result.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      } else {
        throw new Error(result.error || 'Login failed');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setAuthError(err.data?.error || err.data?.detail || err.data?.non_field_errors?.[0] || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loginMutation]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      setAuthError(null);
      setLoading(true);
      // Assuming a register mutation exists elsewhere or will be implemented
      console.log('Register function called, but no RTK Query register mutation available. Implement as needed.');
    } catch (err: any) {
      console.error('Registration failed:', err);
      setAuthError(err.data?.error || err.data?.detail || err.data?.non_field_errors?.[0] || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await logoutMutation().unwrap();
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      localStorage.removeItem('user');
      setUser(null);
      setAuthError(null);
      setLoading(false);
    }
  }, [logoutMutation]);

  const value = React.useMemo(() => ({
    user,
    loading,
    error: authError,
    login,
    register,
    logout,
  }), [user, loading, authError, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Removed withAuth HOC as it's replaced by ProtectedRoute component
