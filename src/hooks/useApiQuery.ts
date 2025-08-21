import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchApi } from '../services/apiClient';

export function useApiQuery<T = any>(
  key: string | any[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => fetchApi<T>(endpoint),
    ...options,
  });
} 