import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginUser, logoutUser, registerUser, checkAuth, selectCurrentUser, selectIsAuthenticated, selectAuthLoading, selectAuthError } from './authSlice';
import { User, LoginCredentials, RegisterData } from '../../types/auth';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  
  // Selectors
  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  
  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<{ user: User | null; error: string | null }> => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return { user: result, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      return { user: null, error: errorMessage };
    }
  }, [dispatch]);
  
  // Register function
  const register = useCallback(async (userData: RegisterData): Promise<{ user: User | null; error: string | null }> => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      return { user: result.user, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      return { user: null, error: errorMessage };
    }
  }, [dispatch]);
  
  // Logout function
  const logout = useCallback(async (): Promise<{ success: boolean; error: string | null }> => {
    try {
      await dispatch(logoutUser()).unwrap();
      return { success: true, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      return { success: false, error: errorMessage };
    }
  }, [dispatch]);
  
  // Check auth status
  const checkAuthStatus = useCallback(async (): Promise<{ isAuthenticated: boolean; user: User | null }> => {
    try {
      const result = await dispatch(checkAuth()).unwrap();
      return { isAuthenticated: true, user: result.user };
    } catch (error) {
      return { isAuthenticated: false, user: null };
    }
  }, [dispatch]);
  
  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    
    // Actions
    login,
    register,
    logout,
    checkAuth: checkAuthStatus,
  };
};

export default useAuth;
