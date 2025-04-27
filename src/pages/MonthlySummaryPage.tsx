import { useState } from 'react';
import { MonthlySummaryForm } from '../components/monthly-summary/MonthlySummaryForm';
import { MonthlySummaryInsights } from '../components/monthly-summary/MonthlySummaryInsights';
import { AddBalanceModal } from '../components/monthly-summary/AddBalanceModal';
import { AddIncomeModal } from '../components/monthly-summary/AddIncomeModal';
import { formatDate } from '../constants/dateFormat';

export function MonthlySummaryPage() {
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Financial Dashboard</h1>
          <div className="text-sm text-gray-500">
            {formatDate(new Date())}
          </div>
        </div>

        {/* Add Entry Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            onClick={() => setShowBalanceModal(true)}
          >
            + Add End Month Balance
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            onClick={() => setShowIncomeModal(true)}
          >
            + Add Income
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Right Column - Insights and Data */}
          <div className="lg:col-span-3">
            <MonthlySummaryInsights />
          </div>
        </div>
      </div>

      {/* Modal for Balance Form */}
      <AddBalanceModal isOpen={showBalanceModal} onClose={() => setShowBalanceModal(false)} />
      {/* Modal for Income Form */}
      <AddIncomeModal isOpen={showIncomeModal} onClose={() => setShowIncomeModal(false)} />
    </div>
  );
}

export default MonthlySummaryPage;
