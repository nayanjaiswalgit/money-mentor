import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

export function useIncomes() {
  return useQuery({ queryKey: ['incomes'], queryFn: api.incomes.getAll });
}

export function useCreateIncome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.incomes.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['incomes'] })
  });
}

export function useUpdateIncome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: any) => api.incomes.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['incomes'] })
  });
}
