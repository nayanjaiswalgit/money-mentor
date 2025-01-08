import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { ExpenseTypeSelect } from './ExpenseTypeSelect';
import { TimeIntervalSelect } from './TimeIntervalSelect';
import { DateInput } from './DateInput';

export function RecurringExpenseForm() {
  const [expenseType, setExpenseType] = useState('');
  const [interval, setInterval] = useState('monthly');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Add Recurring Expense</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <ExpenseTypeSelect value={expenseType} onChange={setExpenseType} />
        <TimeIntervalSelect value={interval} onChange={setInterval} />
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-7 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        <DateInput value={startDate} onChange={setStartDate} />

        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Recurring Expense
        </button>
      </form>
    </div>
  );
}