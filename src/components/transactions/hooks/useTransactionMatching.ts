import { useState } from 'react';
import { Transaction } from '../types';

export function useTransactionMatching() {
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleMatch = (transactionId: string, expense: Transaction['matchedExpense']) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId 
        ? { ...t, matchedExpense: expense, category: expense?.category || t.category } 
        : t
    ));
  };

  const handleUnmatch = (transactionId: string) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId ? { ...t, matchedExpense: null } : t
    ));
  };

  return {
    selectedTransactionId,
    setSelectedTransactionId,
    transactions,
    setTransactions,
    handleMatch,
    handleUnmatch
  };
}