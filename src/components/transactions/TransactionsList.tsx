import React from 'react';
import { ArrowUpRight, ArrowDownRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Transaction } from './types';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-03-15',
    description: 'Grocery Store Purchase',
    amount: -156.78,
    category: 'groceries',
    matchedExpense: {
      id: 'exp1',
      description: 'Monthly Groceries',
      amount: 156.78,
      date: '2024-03-15',
      category: 'groceries'
    }
  },
  {
    id: '2',
    date: '2024-03-14',
    description: 'Restaurant Payment',
    amount: -45.90,
    category: 'dining',
    matchedExpense: null
  }
];

interface Props {
  statementId?: string;
}

export function TransactionsList({ statementId }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="divide-y divide-gray-200">
        {mockTransactions.map((transaction) => (
          <div key={transaction.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  transaction.amount < 0 ? 'bg-red-50' : 'bg-green-50'
                }`}>
                  {transaction.amount < 0 ? (
                    <ArrowDownRight className="h-5 w-5 text-red-600" />
                  ) : (
                    <ArrowUpRight className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <p className={`text-sm font-semibold ${
                  transaction.amount < 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </p>
                
                {transaction.matchedExpense ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle2 className="h-5 w-5 mr-1" />
                    <span className="text-sm">Matched</span>
                  </div>
                ) : (
                  <button className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md">
                    Add as Expense
                  </button>
                )}
              </div>
            </div>
            
            {transaction.matchedExpense && (
              <div className="mt-2 ml-11 flex items-center text-sm text-gray-500">
                <AlertCircle className="h-4 w-4 mr-1" />
                Matched with expense: {transaction.matchedExpense.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}