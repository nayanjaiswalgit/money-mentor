import { api } from '../services/api';
import { useQueryWrapper } from './useQueryWrapper';
import { Account } from '../types';

export const useAccounts = (options = {}) => {
  return useQueryWrapper<Account[]>({
    queryKey: ['accounts'],
    queryFn: api.accounts.getAll,
    ...options,
  });
};

export const useAccount = (id: string, options = {}) => {
  return useQueryWrapper<Account>({
    queryKey: ['accounts', id],
    queryFn: () => api.accounts.getById(id),
    enabled: !!id, // Only run the query if we have an ID
    ...options,
  });
}; 