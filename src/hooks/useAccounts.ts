import api, { accountAPI } from '../services/api';
import { useQueryWrapper } from './useQueryWrapper';
import { Account } from '../types';

export const useAccounts = (options = {}) => {
  return useQueryWrapper<Account[]>({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await accountAPI.getAccounts();
      return response.data.results; // Assuming API returns data in .results
    },
    ...options,
  });
};

export const useAccount = (id: string, options = {}) => {
  return useQueryWrapper<Account>({
    queryKey: ['accounts', id],
    queryFn: async () => {
      const response = await accountAPI.getAccountById(id);
      return response.data; // Assuming API returns data directly
    },
    enabled: !!id, // Only run the query if we have an ID
    ...options,
  });
}; 