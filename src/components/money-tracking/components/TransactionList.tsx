import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between"
        >
          <div className="flex items-center">
            <div
              className={`p-2 rounded-lg ${
                transaction.type === 'income' ? 'bg-green-50' : 'bg-red-50'
              }`}
            >
              {transaction.type === 'income' ? (
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              ) : (
                <ArrowDownRight className="h-5 w-5 text-red-600" />
              )}
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">
                {transaction.description}
              </p>
              <p className="text-sm text-gray-500">{transaction.category}</p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={`text-sm font-semibold ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}