import React from 'react';
import { Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Transaction } from './types';

interface Props {
  selectedTransaction: Transaction;
  onMatch: (expense: any) => void;
}

const mockMatchedExpenses = [
  {
    id: 'exp1',
    description: 'Monthly Groceries',
    amount: 156.78,
    date: '2024-03-15',
    category: 'groceries'
  },
  {
    id: 'exp2',
    description: 'Shopping',
    amount: 45.90,
    date: '2024-03-14',
    category: 'shopping'
  }
];

export function MatchedExpensesList({ selectedTransaction, onMatch }: Props) {
  const filteredExpenses = mockMatchedExpenses.filter(expense => 
    Math.abs(expense.amount) === Math.abs(selectedTransaction.amount) ||
    expense.date === selectedTransaction.date
  );

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900">Selected Transaction</h3>
        <div className="mt-2 p-3 bg-indigo-50 rounded-lg">
          <p className="text-sm font-medium text-gray-900">{selectedTransaction.description}</p>
          <p className="text-xs text-gray-500">
            {new Date(selectedTransaction.date).toLocaleDateString()} • ${Math.abs(selectedTransaction.amount).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900">Potential Matches</h3>
        {selectedTransaction.matchedExpense && (
          <p className="mt-1 text-xs text-gray-500">
            Currently matched with: {selectedTransaction.matchedExpense.description}
          </p>
        )}
      </div>
      
      {filteredExpenses.length > 0 ? (
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div 
              key={expense.id} 
              className={`flex items-center justify-between p-3 rounded-lg ${
                selectedTransaction.matchedExpense?.id === expense.id
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-gray-50'
              }`}
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{expense.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(expense.date).toLocaleDateString()} • ${expense.amount.toFixed(2)}
                </p>
              </div>
              {selectedTransaction.matchedExpense?.id !== expense.id && (
                <button
                  onClick={() => onMatch(expense)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
                >
                  <LinkIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">No matching expenses found</p>
        </div>
      )}
    </div>
  );
}