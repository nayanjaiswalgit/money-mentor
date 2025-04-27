import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { MonthlyAccountSummary } from '../types/MonthlyAccountSummary';

export function useMonthlySummaries() {
  return useQuery<MonthlyAccountSummary[]>(['monthlySummaries'], api.monthlySummaries.getAll);
}

export function useCreateMonthlySummary() {
  const queryClient = useQueryClient();
  return useMutation(api.monthlySummaries.create, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['monthlySummaries'] }),
  });
}
