import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { StatementUpload } from './upload/StatementUpload';
import { StatementsList } from './list/StatementsList';
import { AccountGrid } from './AccountGrid';
import { accounts } from './types';
import { useStatements } from './hooks/useStatements';

const mockStatements = [
  {
    id: '1',
    accountId: '1',
    fileName: 'march-2024-checking.pdf',
    uploadDate: '2024-03-15',
    status: 'processed' as const,
    transactions: 45,
  },
  {
    id: '2',
    accountId: '3',
    fileName: 'march-2024-credit.pdf',
    uploadDate: '2024-03-14',
    status: 'processing' as const,
    transactions: null,
  },
];

export function StatementsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { selectedAccountId, setSelectedAccountId, filteredStatements } = useStatements(mockStatements);

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Statements</h1>
          <p className="mt-1 text-sm text-gray-500">Upload and manage your financial statements</p>
        </div>
        
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Upload Statement
        </button>
      </div>

      <AccountGrid
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        onSelectAccount={setSelectedAccountId}
      />
      
      <StatementsList
        statements={filteredStatements}
        accounts={accounts}
      />

      {showUploadModal && (
        <StatementUpload onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}