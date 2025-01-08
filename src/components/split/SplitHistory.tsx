import React from 'react';
import { Receipt, Users, Calendar } from 'lucide-react';

interface MonthGroup {
  month: string;
  expenses: {
    id: string;
    description: string;
    amount: number;
    date: string;
    participants: string[];
    paidBy: string;
  }[];
}

export function SplitHistory() {
  const expensesByMonth: MonthGroup[] = [
    {
      month: 'March 2024',
      expenses: [
        {
          id: '1',
          description: 'Dinner at Italian Restaurant',
          amount: 120.00,
          date: '2024-03-15',
          participants: ['You', 'John', 'Sarah'],
          paidBy: 'You'
        },
        {
          id: '2',
          description: 'Movie Tickets',
          amount: 45.00,
          date: '2024-03-14',
          participants: ['You', 'Sarah'],
          paidBy: 'Sarah'
        }
      ]
    },
    {
      month: 'February 2024',
      expenses: [
        {
          id: '3',
          description: 'Grocery Shopping',
          amount: 89.50,
          date: '2024-02-28',
          participants: ['You', 'John'],
          paidBy: 'John'
        }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Recent Splits</h2>
      
      <div className="space-y-8">
        {expensesByMonth.map((group) => (
          <div key={group.month}>
            <div className="flex items-center mb-4">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-sm font-medium text-gray-900">{group.month}</h3>
            </div>
            
            <div className="space-y-4">
              {group.expenses.map((expense) => (
                <div key={expense.id} className="flex items-start justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Receipt className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">{expense.description}</h3>
                      <p className="text-sm text-gray-500">
                        Paid by {expense.paidBy} • {new Date(expense.date).toLocaleDateString()}
                      </p>
                      <div className="mt-1 flex items-center">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500">
                          {expense.participants.join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      ${expense.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">
                      ${(expense.amount / expense.participants.length).toFixed(2)} per person
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}