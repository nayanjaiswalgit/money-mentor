import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { fetchApi } from '../services/apiClient';

export function useApiMutation<T = any>(
  endpoint: string,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST',
  options?: UseMutationOptions<T, any, any>
) {
  return useMutation<T, any, any>({
    mutationFn: async (body) =>
      fetchApi<T>(endpoint, {
        method,
        body: JSON.stringify(body),
      }),
    ...options,
  });
} 