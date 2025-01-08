import React from 'react';
import { Receipt, Users, CalendarClock } from 'lucide-react';
import type { Expense } from '../../types';

interface ExpenseCardProps {
  expense: Expense;
  onEdit?: (expense: Expense) => void;
}

export function ExpenseCard({ expense, onEdit }: ExpenseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{expense.description}</h3>
          <p className="text-sm text-gray-500">{expense.category}</p>
        </div>
        <p className="text-lg font-medium text-red-600">
          -₹{expense.amount.toLocaleString()}
        </p>
      </div>
      
      <div className="flex items-center space-x-4 text-sm text-gray-500">
        {expense.receipt && (
          <div className="flex items-center">
            <Receipt size={16} className="mr-1" />
            <span>Receipt</span>
          </div>
        )}
        {expense.splitBetween && expense.splitBetween.length > 0 && (
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            <span>{expense.splitBetween.length} people</span>
          </div>
        )}
        {expense.recurring && (
          <div className="flex items-center">
            <CalendarClock size={16} className="mr-1" />
            <span>{expense.frequency}</span>
          </div>
        )}
      </div>
      
      {onEdit && (
        <button
          onClick={() => onEdit(expense)}
          className="mt-4 w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          Edit Expense
        </button>
      )}
    </div>
  );
}