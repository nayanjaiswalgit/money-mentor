import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { StatementUpload } from './upload/StatementUpload';
import { StatementsList } from './list/StatementsList';
import { AccountGrid } from './AccountGrid';
// import { accounts } from './types';
import { useStatements } from './hooks/useStatements';

// const mockStatements = [ ... ]; // Static data removed

export function StatementsPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  // const { selectedAccountId, setSelectedAccountId, filteredStatements } = useStatements();

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Statements</h1>
          <p className="mt-1 text-sm text-gray-500">Upload and manage your financial statements</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Upload Statement
        </button>
      </div>
      {/* <AccountGrid ... />
      <StatementsList ... /> */}
      <div className="text-gray-500">Connect to API for statements data.</div>
      {showUploadModal && (
        <StatementUpload onClose={() => setShowUploadModal(false)} />
      )}
    </div>
  );
}