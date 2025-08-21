import { useApiQuery } from './useApiQuery';
import { useApiMutation } from './useApiMutation';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

export function useExpenses() {
  const expensesQuery = useApiQuery('expenses', `${API_ENDPOINTS.TRANSACTIONS}?type=expense`);
  const createExpense = useApiMutation(API_ENDPOINTS.TRANSACTIONS, 'POST');
  const updateExpense = (id: string) => useApiMutation(`${API_ENDPOINTS.TRANSACTIONS}/${id}`, 'PUT');
  const deleteExpense = (id: string) => useApiMutation(`${API_ENDPOINTS.TRANSACTIONS}/${id}`, 'DELETE');
  return { expensesQuery, createExpense, updateExpense, deleteExpense };
}