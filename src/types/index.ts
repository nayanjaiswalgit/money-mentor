// Add these types to your existing types/index.ts file
export type AccountType = 'checking' | 'savings' | 'money_market';

export interface Account {
  id: string;
  name: string;
  bankName: string;
  balance: number;
  accountType: AccountType;
}

export interface Card {
  id: string;
  name: string;
  bank: string;
  lastFourDigits: string;
  limit: number;
  spent: number;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  accountId: string; // which account/bank deducted from
  paymentMethod?: string; // e.g., UPI, Card
  recurring?: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  notes?: string;
  tags?: string[];
  receipt?: string;
  linkedStatementId?: string; // For reconciliation
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}