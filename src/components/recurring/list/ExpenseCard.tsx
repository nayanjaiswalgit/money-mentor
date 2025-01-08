import React from 'react';
import { CreditCard, Home, Briefcase, Shield, Calendar, Edit2 } from 'lucide-react';

interface Expense {
  id: string;
  type: 'emi' | 'rent' | 'investment' | 'insurance';
  amount: number;
  interval: string;
  nextDate: string;
  description: string;
}

interface Props {
  expense: Expense;
}

export function ExpenseCard({ expense }: Props) {
  const getIcon = (type: Expense['type']) => {
    switch (type) {
      case 'emi': return CreditCard;
      case 'rent': return Home;
      case 'investment': return Briefcase;
      case 'insurance': return Shield;
    }
  };

  const Icon = getIcon(expense.type);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Icon className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">{expense.description}</h3>
            <div className="mt-1 flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(expense.nextDate).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{expense.interval}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold text-gray-900">
            ${expense.amount.toFixed(2)}
          </span>
          <button className="p-1 hover:bg-gray-50 rounded-full">
            <Edit2 className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}