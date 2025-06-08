import { Subscription, User } from '../types/auth';
import { authService } from './auth.service';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class SubscriptionService {
  async getCurrentSubscription(): Promise<Subscription | null> {
    const user = authService.getUser();
    if (!user) return null;
    return user.subscription;
  }

  async upgradeSubscription(planId: string): Promise<Subscription> {
    try {
      const response = await fetch(`${API_URL}/subscriptions/upgrade`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`,
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade subscription');
      }

      const subscription: Subscription = await response.json();
      return subscription;
    } catch (error) {
      throw new Error('Failed to upgrade subscription');
    }
  }

  async cancelSubscription(): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/subscriptions/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }
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
      const response = await fetch(`${API_URL}/subscriptions/plans`, {
        headers: {
          'Authorization': `Bearer ${authService.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscription plans');
      }

      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch subscription plans');
    }
  }
}

export const subscriptionService = new SubscriptionService(); 