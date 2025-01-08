import React, { useState } from 'react';
import { Receipt, Users, Calculator } from 'lucide-react';
import { ParticipantsList } from './ParticipantsList';
import { SplitTypeSelector } from './SplitTypeSelector';

export function SplitExpenseForm() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [splitType, setSplitType] = useState<'equal' | 'percentage' | 'custom'>('equal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle split expense submission
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">New Split Expense</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Receipt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Dinner, Movie tickets, etc."
              />
            </div>
          </div>

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

          <SplitTypeSelector value={splitType} onChange={setSplitType} />
          <ParticipantsList splitType={splitType} />

          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Calculate Split
          </button>
        </div>
      </form>
    </div>
  );
}