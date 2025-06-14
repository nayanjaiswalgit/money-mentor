import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { monthlyBalanceAPI } from '../services/api';

export function useMonthlyBalances() {
  return useQuery({ queryKey: ['monthlyBalances'], queryFn: async () => {
    const response = await monthlyBalanceAPI.getMonthlyBalances();
    return response.data.results; // Assuming API returns data in .results
  } });
}

export function useCreateMonthlyBalance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: monthlyBalanceAPI.createMonthlyBalance,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['monthlyBalances'] })
  });
}

export function useUpdateMonthlyBalance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: any) => monthlyBalanceAPI.updateMonthlyBalance(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['monthlyBalances'] })
  });
}
