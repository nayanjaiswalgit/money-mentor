import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api, { transactionAPI } from '../services/api';

export function useIncomes() {
  return useQuery({ 
    queryKey: ['incomes'], 
    queryFn: async () => {
      const response = await transactionAPI.getTransactions({ type: 'income' });
      return response.data.results; 
    }
  });
}

export function useCreateIncome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => transactionAPI.createTransaction({ ...data, type: 'income' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['incomes'] })
  });
}

export function useUpdateIncome() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: any) => transactionAPI.updateTransaction(id, { ...data, type: 'income' }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['incomes'] })
  });
}
