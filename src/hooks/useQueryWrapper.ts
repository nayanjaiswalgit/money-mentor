import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { ApiError } from '../services/apiClient';

// Generic hook wrapper for React Query
export function useQueryWrapper<TData, TError = ApiError>(
  options: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> & {
    queryKey: string[];
    queryFn: () => Promise<TData>;
  }
) {
  const { queryKey, queryFn, ...restOptions } = options;

  return useQuery<TData, TError>({
    queryKey,
    queryFn,
    retry: (failureCount, error) => {
      // Don't retry on 404 or 401 errors
      if (error instanceof ApiError && (error.status === 404 || error.status === 401)) {
        return false;
      }
      // Default retry behavior
      return failureCount < 3;
    },
    ...restOptions,
  });
} 