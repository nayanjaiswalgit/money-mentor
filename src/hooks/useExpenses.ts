import { useState, useCallback } from 'react';
import type { Expense } from '../types';
import { api } from '../services/api';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.expenses.getAll();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expenses. Please try again later.');
      console.error('Error fetching expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addExpense = useCallback(async (expense: Omit<Expense, 'id'> & {
    accountId: string;
    paymentMethod: string;
    notes?: string;
    tags?: string[];
    linkedStatementId?: string;
  }) => {
    try {
      const newExpense = await api.expenses.create(expense);
      setExpenses(prev => [...prev, newExpense]);
      return newExpense;
    } catch (err) {
      console.error('Error adding expense:', err);
      throw err;
    }
  }, []);

  const updateExpense = useCallback(async (id: string, expense: Partial<Expense>) => {
    try {
      const updatedExpense = await api.expenses.update(id, expense);
      setExpenses(prev => prev.map(exp => exp.id === id ? updatedExpense : exp));
      return updatedExpense;
    } catch (err) {
      console.error('Error updating expense:', err);
      throw err;
    }
  }, []);

  const deleteExpense = useCallback(async (id: string) => {
    try {
      await api.expenses.delete(id);
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    } catch (err) {
      console.error('Error deleting expense:', err);
      throw err;
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