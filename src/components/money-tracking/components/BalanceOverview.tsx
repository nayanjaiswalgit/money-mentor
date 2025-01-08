import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceOverviewProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

export function BalanceOverview({
  balance,
  totalIncome,
  totalExpenses,
}: BalanceOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <DollarSign className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="ml-3 text-sm font-medium text-gray-900">Current Balance</h3>
        </div>
        <p className="mt-4 text-2xl font-semibold text-gray-900">
          ${balance.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="ml-3 text-sm font-medium text-gray-900">Total Income</h3>
        </div>
        <p className="mt-4 text-2xl font-semibold text-green-600">
          ${totalIncome.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-red-50 rounded-lg">
            <TrendingDown className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="ml-3 text-sm font-medium text-gray-900">Total Expenses</h3>
        </div>
        <p className="mt-4 text-2xl font-semibold text-red-600">
          ${totalExpenses.toFixed(2)}
        </p>
      </div>
    </div>
  );
}