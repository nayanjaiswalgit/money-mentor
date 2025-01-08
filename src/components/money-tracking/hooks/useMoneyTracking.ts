import { useState } from 'react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
}

export function useMoneyTracking() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
    };

    setTransactions(prev => [...prev, newTransaction]);
    
    if (transaction.type === 'income') {
      setTotalIncome(prev => prev + transaction.amount);
    } else {
      setTotalExpenses(prev => prev + transaction.amount);
    }
  };

  return {
    transactions,
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    addTransaction,
  };
}