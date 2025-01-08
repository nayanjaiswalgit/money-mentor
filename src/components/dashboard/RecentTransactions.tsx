import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  date: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary Deposit',
    amount: 50000,
    type: 'credit',
    category: 'Income',
    date: '2024-03-01',
  },
  {
    id: '2',
    title: 'Grocery Shopping',
    amount: 2500,
    type: 'debit',
    category: 'Food',
    date: '2024-03-02',
  },
  {
    id: '3',
    title: 'Electricity Bill',
    amount: 1800,
    type: 'debit',
    category: 'Utilities',
    date: '2024-03-03',
  },
];

export function RecentTransactions() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Transactions
          </h3>
          <a
            href="/transactions"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            View all
          </a>
        </div>
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="py-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'credit'
                      ? 'bg-green-100'
                      : 'bg-red-100'
                  }`}
                >
                  {transaction.type === 'credit' ? (
                    <ArrowUpRight
                      className="text-green-600"
                      size={20}
                    />
                  ) : (
                    <ArrowDownRight
                      className="text-red-600"
                      size={20}
                    />
                  )}
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.title}
                  </p>
                  <p className="text-sm text-gray-500">{transaction.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-medium ${
                    transaction.type === 'credit'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}₹
                  {transaction.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}