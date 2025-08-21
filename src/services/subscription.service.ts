import { Subscription, User } from '../types/auth';
import { authService } from './auth.service';
import { fetchApi } from './apiClient';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

class SubscriptionService {
  async getCurrentSubscription(): Promise<Subscription | null> {
    const user = authService.getUser();
    if (!user) return null;
    return user.subscription;
  }

  async upgradeSubscription(planId: string): Promise<Subscription> {
    try {
      const subscription: Subscription = await fetchApi(
        API_ENDPOINTS.SUBSCRIPTION_UPGRADE,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planId }),
        }
      );
      return subscription;
    } catch (error) {
      throw new Error('Failed to upgrade subscription');
    }
  }

  async cancelSubscription(): Promise<void> {
    try {
      await fetchApi(
        API_ENDPOINTS.SUBSCRIPTION_CANCEL,
        {
          method: 'POST',
        }
      );
    } catch (error) {
      throw new Error('Failed to cancel subscription');
    }
  }

  isSubscriptionActive(): boolean {
    const subscription = authService.getUser()?.subscription;
    return subscription?.status === 'active';
  }

  getSubscriptionFeatures(): string[] {
    const subscription = authService.getUser()?.subscription;
    return subscription?.features || [];
  }

  async getAvailablePlans(): Promise<Array<{
    id: string;
    name: string;
    price: number;
    features: string[];
    interval: 'monthly' | 'yearly';
  }>> {
    try {
      const plans = await fetchApi(API_ENDPOINTS.SUBSCRIPTION_PLANS);
      return plans;
    } catch (error) {
      throw new Error('Failed to fetch subscription plans');
    }
  }
}

export const subscriptionService = new SubscriptionService(); 