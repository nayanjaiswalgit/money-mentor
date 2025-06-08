import { useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { featureService } from '../services/feature.service';
import { subscriptionService } from '../services/subscription.service';
import { User, LoginCredentials, RegisterData } from '../types/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return authService.isAuthenticated();
  };

  const hasRole = (role: string) => {
    return authService.hasRole(role);
  };

  const hasFeature = (featureId: string) => {
    return featureService.isFeatureEnabled(featureId);
  };

  const getEnabledFeatures = () => {
    return featureService.getEnabledFeatures();
  };

  const getSubscription = async () => {
    return await subscriptionService.getCurrentSubscription();
  };

  const isSubscriptionActive = () => {
    return subscriptionService.isSubscriptionActive();
  };

  const getSubscriptionFeatures = () => {
    return subscriptionService.getSubscriptionFeatures();
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
    hasFeature,
    getEnabledFeatures,
    getSubscription,
    isSubscriptionActive,
    getSubscriptionFeatures,
  };
}; 