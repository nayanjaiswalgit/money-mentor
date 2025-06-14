// Add these types to your existing types/index.ts file
export type AccountType = 'checking' | 'savings' | 'money_market';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  userId: string;
  type: 'bank' | 'credit' | 'cash';
  name: string;
  balance: number;
  currency: string;
  institution?: string;
  lastSync?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  accountId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  category: string;
  amount: number;
  period: 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface SharedExpense {
  id: string;
  creatorId: string;
  title: string;
  amount: number;
  currency: string;
  participants: {
    userId: string;
    amount: number;
    paid: boolean;
  }[];
  status: 'pending' | 'settled';
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  userId: string;
  number: string;
  amount: number;
  currency: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  client: {
    name: string;
    email: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Statement {
  id: string;
  userId: string;
  accountId: string;
  fileName: string;
  fileUrl: string;
  status: 'processing' | 'completed' | 'failed';
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GmailIntegration {
  id: string;
  userId: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  startDate: string;
  endDate: string;
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  categoryBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  budgetStatus: {
    category: string;
    budgeted: number;
    spent: number;
    remaining: number;
  }[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface Card {
  id: string;
  name: string;
  cardType: string;
  last4Digits: string;
  balance: number;
  creditLimit: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  // Add any other relevant fields for a credit card
}