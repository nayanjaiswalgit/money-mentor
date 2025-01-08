import React from 'react';
import { FileSpreadsheet, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { TransactionsList } from './TransactionsList';
import { BulkAddModal } from './BulkAddModal';

export function TransactionsPage() {
  const { statementId } = useParams();
  const [showBulkModal, setShowBulkModal] = React.useState(false);

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link 
            to="/upload"
            className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Statement Transactions</h1>
            <p className="mt-1 text-sm text-gray-500">March 2024 Statement</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowBulkModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FileSpreadsheet className="h-5 w-5 mr-2" />
          Bulk Add Transactions
        </button>
      </div>

      <TransactionsList statementId={statementId} />
      
      {showBulkModal && (
        <BulkAddModal
          isOpen={showBulkModal}
          onClose={() => setShowBulkModal(false)}
        />
      )}
    </div>
  );
}