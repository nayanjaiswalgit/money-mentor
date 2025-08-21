// TODO: Refactor this hook to use useApiQuery/useApiMutation and API_ENDPOINTS for all income-related API calls. Remove all usage of api and transactionAPI.

import { useApiQuery } from './useApiQuery';
import { useApiMutation } from './useApiMutation';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export function useIncomes() {
  const incomesQuery = useApiQuery('incomes', `${API_ENDPOINTS.TRANSACTIONS}?type=income`);
  const createIncome = useApiMutation(API_ENDPOINTS.TRANSACTIONS, 'POST');
  return { incomesQuery, createIncome };
}

export function useUpdateIncome(id: string) {
  return useApiMutation(`${API_ENDPOINTS.TRANSACTIONS}/${id}`, 'PUT');
}
