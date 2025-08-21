import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import type { Transaction } from '../types';
import { AddTransactionModal } from '../components/transactions/AddTransactionModal';
import { GenericList } from '../components/common/GenericList';

// Fetch function for GenericList
const fetchTransactions = async ({ search, filters, page, pageSize }: any) => {
  // Compose query params
  const params = new URLSearchParams({
    search: search || '',
    type: filters.type || '',
    page: String(page),
    pageSize: String(pageSize),
  });
  const response = await fetch(`${API_ENDPOINTS.TRANSACTIONS}?${params.toString()}`);
  const result = await response.json();
  // Assume result.items and result.total, fallback if needed
  return { data: result.items || result, total: result.total || (result.items ? result.items.length : result.length) };
};

export function TransactionsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // Add/edit logic remains
  const handleModal = (tx: Transaction | null = null) => {
    setSelectedTx(tx);
    setModalOpen(true);
  };

  // Placeholder for save logic (should be implemented as needed)
  const handleSave = async (tx: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    // Implement create/update logic here
    setModalOpen(false);
    setSelectedTx(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => handleModal()}
        >
          <Plus size={20} className="mr-2" /> Add Transaction
        </button>
      </div>
      <GenericList
        config={{
          fetchData: fetchTransactions,
          fields: [
            { key: 'date', label: 'Date' },
            { key: 'description', label: 'Description' },
            { key: 'accountId', label: 'Account' },
            { key: 'amount', label: 'Amount' },
            { key: 'type', label: 'Type' },
          ],
          filterFields: [
            { key: 'type', label: 'Type', type: 'select', options: [
              { value: '', label: 'All' },
              { value: 'expense', label: 'Expense' },
              { value: 'income', label: 'Income' },
            ]},
          ],
          initialFilters: { type: '' },
          title: 'Transactions',
          searchPlaceholder: 'Search transactions...',
        }}
      />
      {modalOpen && (
        <AddTransactionModal
          onClose={() => { setModalOpen(false); setSelectedTx(null); }}
          onSubmit={handleSave}
          initialValues={selectedTx || undefined}
        />
      )}
    </div>
  );
}
