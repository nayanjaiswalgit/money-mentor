import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useMonthlyBalances() {
  return useQuery({ queryKey: ['monthlyBalances'], queryFn: api.monthlyBalances.getAll });
}

export function useCreateMonthlyBalance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.monthlyBalances.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['monthlyBalances'] })
  });
}

export function useUpdateMonthlyBalance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: any) => api.monthlyBalances.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['monthlyBalances'] })
  });
}
