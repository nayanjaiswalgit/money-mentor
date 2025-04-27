import { Account, Card, Transaction } from '../types';
import { fetchApi } from './apiClient';

// API endpoints
const ENDPOINTS = {
  accounts: '/accounts',
  cards: '/cards',
  expenses: '/expenses/',
  monthlySummaries: '/monthly-summaries',
  monthlyBalances: '/monthly_balances/',
  incomes: '/incomes/',
};

// --- Monthly Summaries ---
export type MonthlyAccountSummary = {
  id: string;
  user: string;
  account: string;
  month: string; // YYYY-MM-DD
  end_balance: string;
  income: string;
  created_at: string;
};

export const api = {
  accounts: {
    getAll: async (): Promise<Account[]> => {
      return fetchApi<Account[]>(ENDPOINTS.accounts);
    },
    getById: async (id: string): Promise<Account> => {
      return fetchApi<Account>(`${ENDPOINTS.accounts}/${id}`);
    },
    create: async (account: Omit<Account, 'id'>): Promise<Account> => {
      return fetchApi<Account>(ENDPOINTS.accounts, {
        method: 'POST',
        body: JSON.stringify(account),
      });
    },
    update: async (id: string, account: Partial<Account>): Promise<Account> => {
      return fetchApi<Account>(`${ENDPOINTS.accounts}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(account),
      });
    },
    delete: async (id: string): Promise<void> => {
      return fetchApi<void>(`${ENDPOINTS.accounts}/${id}`, {
        method: 'DELETE',
      });
    },
  },
  cards: {
    getAll: async (): Promise<Card[]> => {
      return fetchApi<Card[]>(ENDPOINTS.cards);
    },
    getById: async (id: string): Promise<Card> => {
      return fetchApi<Card>(`${ENDPOINTS.cards}/${id}`);
    },
    create: async (card: Omit<Card, 'id'>): Promise<Card> => {
      return fetchApi<Card>(ENDPOINTS.cards, {
        method: 'POST',
        body: JSON.stringify(card),
      });
    },
    update: async (id: string, card: Partial<Card>): Promise<Card> => {
      return fetchApi<Card>(`${ENDPOINTS.cards}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(card),
      });
    },
    delete: async (id: string): Promise<void> => {
      return fetchApi<void>(`${ENDPOINTS.cards}/${id}`, {
        method: 'DELETE',
      });
    },
  },
  expenses: {
    getAll: async (): Promise<Transaction[]> => {
      return fetchApi<Transaction[]>(ENDPOINTS.expenses);
    },
    getById: async (id: string): Promise<Transaction> => {
      return fetchApi<Transaction>(`${ENDPOINTS.expenses}${id}/`);
    },
    create: async (expense: Omit<Transaction, 'id'>): Promise<Transaction> => {
      return fetchApi<Transaction>(ENDPOINTS.expenses, {
        method: 'POST',
        body: JSON.stringify(expense),
      });
    },
    update: async (id: string, expense: Partial<Transaction>): Promise<Transaction> => {
      return fetchApi<Transaction>(`${ENDPOINTS.expenses}${id}/`, {
        method: 'PUT',
        body: JSON.stringify(expense),
      });
    },
    delete: async (id: string): Promise<void> => {
      return fetchApi<void>(`${ENDPOINTS.expenses}${id}/`, {
        method: 'DELETE',
      });
    },
  },
  monthlySummaries: {
    getAll: async (): Promise<MonthlyAccountSummary[]> => fetchApi(ENDPOINTS.monthlySummaries),
    create: async (data: Omit<MonthlyAccountSummary, 'id' | 'user' | 'created_at'>) =>
      fetchApi(ENDPOINTS.monthlySummaries, { method: 'POST', body: JSON.stringify(data) }),
  },
  monthlyBalances: {
    getAll: async () => fetchApi(ENDPOINTS.monthlyBalances),
    create: async (data: any) => fetchApi(ENDPOINTS.monthlyBalances, { method: 'POST', body: JSON.stringify(data) }),
    update: async (id: string, data: any) => fetchApi(`${ENDPOINTS.monthlyBalances}${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id: string) => fetchApi(`${ENDPOINTS.monthlyBalances}${id}/`, { method: 'DELETE' }),
  },
  incomes: {
    getAll: async () => fetchApi(ENDPOINTS.incomes),
    create: async (data: any) => fetchApi(ENDPOINTS.incomes, { method: 'POST', body: JSON.stringify(data) }),
    update: async (id: string, data: any) => fetchApi(`${ENDPOINTS.incomes}${id}/`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: async (id: string) => fetchApi(`${ENDPOINTS.incomes}${id}/`, { method: 'DELETE' }),
  },
};