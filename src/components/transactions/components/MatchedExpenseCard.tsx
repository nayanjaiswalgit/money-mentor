import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { Transaction } from '../types';

interface Props {
  expense: NonNullable<Transaction['matchedExpense']>;
  isMatched: boolean;
  onMatch: () => void;
}

export function MatchedExpenseCard({ expense, isMatched, onMatch }: Props) {
  return (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg ${
        isMatched ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
      }`}
    >
      <div>
        <p className="text-sm font-medium text-gray-900">{expense.description}</p>
        <p className="text-xs text-gray-500">
          {new Date(expense.date).toLocaleDateString()} • ${expense.amount.toFixed(2)}
        </p>
      </div>
      {!isMatched && (
        <button
          onClick={onMatch}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
        >
          <LinkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}