// Add these types to your existing types/index.ts file
export type AccountType = 'checking' | 'savings' | 'money_market';

export interface Account {
  id: string;
  account_name: string;
  type: string;
  bank_name?: string;
  bank_image?: any;
  balance: number;
}

export interface Card {
  id: string;
  name: string;
  bank: string;
  lastFourDigits: string;
  limit: number;
  spent: number;
}

export interface Transaction {
  id: string;
  user: string;
  account: string;
  amount: number;
  is_credit: boolean;
  date: string;
  description: string;
  expenses?: string[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}