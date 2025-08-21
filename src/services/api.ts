import axios from 'axios';
import { Account, Card, Transaction } from '../types';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Account APIs
export const accountAPI = {
  connectBank: (bankData: any) => api.post('/accounts/connect-bank', bankData),
  getAccounts: () => api.get('/accounts'),
  getAccountById: (id: string) => api.get(`/accounts/${id}`),
  disconnectAccount: (accountId: string) => api.delete(`/accounts/${accountId}`),
};

// Transaction APIs
export const transactionAPI = {
  getTransactions: (params?: { startDate?: string; endDate?: string; category?: string; type?: 'income' | 'expense' }) =>
    api.get('/transactions', { params }),
  createTransaction: (transactionData: any) => api.post('/transactions', transactionData),
  updateTransaction: (id: string, transactionData: any) =>
    api.put(`/transactions/${id}`, transactionData),
  deleteTransaction: (id: string) => api.delete(`/transactions/${id}`),
};

// Budget APIs
export const budgetAPI = {
  getBudgets: () => api.get('/budgets'),
  createBudget: (budgetData: any) => api.post('/budgets', budgetData),
  updateBudget: (id: string, budgetData: any) => api.put(`/budgets/${id}`, budgetData),
  deleteBudget: (id: string) => api.delete(`/budgets/${id}`),
};

// Category APIs
export const categoryAPI = {
  getCategories: () => api.get('/categories'),
  createCategory: (categoryData: any) => api.post('/categories', categoryData),
  updateCategory: (id: string, categoryData: any) => api.put(`/categories/${id}`, categoryData),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
};

// Report APIs
export const reportAPI = {
  getSpendingReport: (params: { startDate: string; endDate: string }) =>
    api.get('/reports/spending', { params }),
  getBudgetReport: (params: { startDate: string; endDate: string }) =>
    api.get('/reports/budget', { params }),
  getCategoryReport: (params: { startDate: string; endDate: string }) =>
    api.get('/reports/category', { params }),
};

// Shared Expense APIs
export const sharedExpenseAPI = {
  getSharedExpenses: () => api.get('/shared-expenses'),
  createSharedExpense: (expenseData: any) => api.post('/shared-expenses', expenseData),
  updateSharedExpense: (id: string, expenseData: any) =>
    api.put(`/shared-expenses/${id}`, expenseData),
  deleteSharedExpense: (id: string) => api.delete(`/shared-expenses/${id}`),
  settleExpense: (id: string) => api.post(`/shared-expenses/${id}/settle`),
};

// Invoice APIs
export const invoiceAPI = {
  getInvoices: () => api.get('/invoices'),
  createInvoice: (invoiceData: any) => api.post('/invoices', invoiceData),
  updateInvoice: (id: string, invoiceData: any) => api.put(`/invoices/${id}`, invoiceData),
  deleteInvoice: (id: string) => api.delete(`/invoices/${id}`),
  sendInvoice: (id: string) => api.post(`/invoices/${id}/send`),
};

// Statement Upload APIs
export const statementAPI = {
  uploadStatement: (formData: FormData) =>
    api.post('/statements/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  getStatements: () => api.get('/statements'),
  deleteStatement: (id: string) => api.delete(`/statements/${id}`),
};

// Gmail Integration APIs
export const gmailAPI = {
  connectGmail: () => api.post('/gmail/connect'),
  disconnectGmail: () => api.post('/gmail/disconnect'),
  syncGmail: () => api.post('/gmail/sync'),
  getGmailStatus: () => api.get('/gmail/status'),
};

// Monthly Balance APIs
export const monthlyBalanceAPI = {
  getMonthlyBalances: () => api.get('/monthly-balances'),
  createMonthlyBalance: (balanceData: any) => api.post('/monthly-balances', balanceData),
  updateMonthlyBalance: (id: string, balanceData: any) =>
    api.put(`/monthly-balances/${id}`, balanceData),
  deleteMonthlyBalance: (id: string) => api.delete(`/monthly-balances/${id}`),
};

export default api;