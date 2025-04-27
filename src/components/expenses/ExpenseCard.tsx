import React from 'react';
import { Receipt, Users, CalendarClock, Trash2 } from 'lucide-react';
import type { Expense } from '../../types';

interface ExpenseCardProps {
  expense: Expense;
  onEdit?: (expense: Expense) => void;
  onDelete?: () => void;
}

export function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
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
      
      <div className="mt-4 flex space-x-2">
        {onEdit && (
          <button
            onClick={() => onEdit(expense)}
            className="flex-1 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
          >
            Edit Expense
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}