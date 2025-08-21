import { useApiQuery } from './useApiQuery';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { Account } from '../types';
import { UseQueryOptions } from '@tanstack/react-query';

export const useAccounts = (options?: Omit<UseQueryOptions<Account[]>, 'queryKey' | 'queryFn'>) => {
  return useApiQuery<Account[]>(
    'accounts',
    API_ENDPOINTS.ACCOUNTS,
    options
  );
};

export const useAccount = (id: string, options?: Omit<UseQueryOptions<Account>, 'queryKey' | 'queryFn'>) => {
  const mergedOptions = { ...(options || {}), enabled: !!id && (options?.enabled ?? true) };
  return useApiQuery<Account>(
    ['accounts', id],
    `${API_ENDPOINTS.ACCOUNTS}/${id}`,
    mergedOptions
  );
}; 