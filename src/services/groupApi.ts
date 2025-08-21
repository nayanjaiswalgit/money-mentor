// DEPRECATED: Use fetchApi from apiClient.ts and API_ENDPOINTS for all group API calls. This file is no longer used.

import { fetchApi } from './apiClient';

export const groupApi = {
  getGroups: async () => fetchApi('/groups/'),
  createGroup: async (data: { name: string; title?: string; description?: string; members?: Array<{ email: string }> }) =>
    fetchApi('/groups/', { method: 'POST', body: JSON.stringify(data) }),
  getExpenses: async (groupId: string) => fetchApi(`/groups/${groupId}/expenses/`),
  addExpense: async (groupId: string, data: any) =>
    fetchApi(`/groups/${groupId}/expenses/`, { method: 'POST', body: JSON.stringify(data) }),
  splitExpense: async (groupId: string, expenseId: string, splits: any[]) =>
    fetchApi(`/groups/${groupId}/expenses/${expenseId}/split/`, { method: 'POST', body: JSON.stringify({ splits }) }),
  getSettlements: async (groupId: string) => fetchApi(`/groups/${groupId}/settlements/`),
  addSettlement: async (groupId: string, data: any) =>
    fetchApi(`/groups/${groupId}/settlements/`, { method: 'POST', body: JSON.stringify(data) }),
  getBalances: async (groupId: string) => fetchApi(`/groups/${groupId}/balances/`),
  getHistory: async (groupId: string) => fetchApi(`/groups/${groupId}/history/`),
};
