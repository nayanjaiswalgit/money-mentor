import { useCallback, useState } from 'react';
import api, { transactionAPI } from '../services/api';
import type { Transaction } from '../types';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await transactionAPI.getTransactions({ type: 'expense' });
      setExpenses(response.data.results || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expenses. Please try again later.');
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expense: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newExpense = await transactionAPI.createTransaction({ ...expense, type: 'expense' });
      setExpenses(prev => [...prev, newExpense.data]);
      return newExpense.data; // Assuming API returns data in .data
    } catch (err) {
      console.error('Error adding expense:', err);
      throw err; // Re-throw for error handling in components
    }
  }, []);

  const updateExpense = useCallback(async (id: string, expense: Partial<Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) => {
    try {
      const updatedExpense = await transactionAPI.updateTransaction(id, { ...expense, type: 'expense' });
      setExpenses(prev => prev.map(exp => exp.id === id ? updatedExpense.data : exp));
      return updatedExpense.data; // Assuming API returns data in .data
    } catch (err) {
      console.error('Error updating expense:', err);
      throw err; // Re-throw for error handling in components
    }
  }, []);

  const deleteExpense = useCallback(async (id: string) => {
    try {
      await transactionAPI.deleteTransaction(id);
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
      throw err; // Re-throw for error handling in components
    }
  }, []);

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
}