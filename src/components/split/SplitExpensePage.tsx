import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { SplitExpenseModal } from './SplitExpenseModal';
import { SplitHistory } from './SplitHistory';
import { SplitSummary } from './SplitSummary';

export function SplitExpensePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Split Expenses</h1>
          <p className="mt-1 text-sm text-gray-500">Split bills and expenses with friends</p>
        </div>
        
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Split
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SplitHistory />
        </div>
        <div>
          <SplitSummary />
        </div>
      </div>

      {showModal && (
        <SplitExpenseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}