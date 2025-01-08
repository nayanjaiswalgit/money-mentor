import React, { useState } from 'react';
import { X, Calendar, DollarSign, User } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTransactionModal({ isOpen, onClose }: Props) {
  const [type, setType] = useState<'lend' | 'borrow'>('lend');
  const [amount, setAmount] = useState('');
  const [person, setPerson] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle transaction submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add Transaction</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('lend')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  type === 'lend'
                    ? 'bg-green-50 text-green-700 border-2 border-green-500'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                Lending Money
              </button>
              <button
                type="button"
                onClick={() => setType('borrow')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  type === 'borrow'
                    ? 'bg-red-50 text-red-700 border-2 border-red-500'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                Borrowing Money
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Person</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <div className="mt-1">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="What's this for?"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                type === 'lend'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Add {type === 'lend' ? 'Lending' : 'Borrowing'} Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}