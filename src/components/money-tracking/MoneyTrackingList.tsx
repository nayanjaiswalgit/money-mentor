import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, MoreVertical } from 'lucide-react';
import { Transaction } from './types';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'lend',
    amount: 500,
    person: 'John Doe',
    date: '2024-03-15',
    dueDate: '2024-04-15',
    description: 'Emergency fund',
    status: 'pending'
  },
  {
    id: '2',
    type: 'borrow',
    amount: 200,
    person: 'Jane Smith',
    date: '2024-03-10',
    dueDate: '2024-03-25',
    description: 'Lunch payment',
    status: 'pending'
  }
];

export function MoneyTrackingList() {
  const [filter, setFilter] = useState<'all' | 'lent' | 'borrowed'>('all');

  const filteredTransactions = mockTransactions.filter(transaction => {
    if (filter === 'all') return true;
    return filter === 'lent' ? transaction.type === 'lend' : transaction.type === 'borrow';
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex space-x-2">
          {(['all', 'lent', 'borrowed'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                filter === type
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'lend' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  {transaction.type === 'lend' ? (
                    <ArrowUpRight className="h-5 w-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{transaction.person}</p>
                  <p className="text-sm text-gray-500">{transaction.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`text-sm font-semibold ${
                    transaction.type === 'lend' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Due: {new Date(transaction.dueDate || '').toLocaleDateString()}
                  </p>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}