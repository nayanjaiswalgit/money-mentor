import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { ExpenseCard } from '../components/expenses/ExpenseCard';
import type { Expense } from '../types';
import { ChatExpense } from '../components/chat/ChatExpense';

const expenses: Expense[] = [
  {
    id: '1',
    date: '2024-03-05',
    description: 'Monthly Rent',
    amount: 25000,
    category: 'Housing',
    recurring: true,
    
    frequency: 'monthly',
  },
  {
    id: '2',
    date: '2024-03-04',
    description: 'Team Lunch',
    amount: 2500,
    category: 'Food',
    splitBetween: ['user1', 'user2', 'user3'],
    receipt: 'https://example.com/receipt.jpg',
  },
];

export function ExpensesPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="mr-2 text-gray-500" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onEdit={(expense) => console.log('Edit expense:', expense)}
          />
        ))}
      </div>
      <ChatExpense/>
    </div>
  );
}