import React from 'react';
import { useMoneyTracking } from './hooks/useMoneyTracking';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { BalanceOverview } from './components/BalanceOverview';

export function MoneyTrackingPage() {
  const { transactions, totalIncome, totalExpenses, balance, addTransaction } = useMoneyTracking();

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Money Tracking</h1>
      
      <BalanceOverview
        balance={balance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TransactionForm onSubmit={addTransaction} />
        </div>
        <div className="lg:col-span-2">
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}