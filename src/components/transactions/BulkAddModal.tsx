import React, { useState } from 'react';
import { X, Save, Link as LinkIcon, Unlink } from 'lucide-react';
import { EditableTransactionGrid } from './EditableTransactionGrid';
import { MatchedExpensesList } from './MatchedExpensesList';
import { Transaction } from './types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function BulkAddModal({ isOpen, onClose }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2024-03-15', description: 'WALMART STORE', amount: -156.78, category: '', matchedExpense: null },
    { id: '2', date: '2024-03-14', description: 'AMAZON.COM', amount: -45.90, category: '', matchedExpense: null },
  ]);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  const handleMatch = (transactionId: string, expense: Transaction['matchedExpense']) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId 
        ? { 
            ...t, 
            matchedExpense: expense,
            category: expense?.category || t.category 
          } 
        : t
    ));
  };

  const handleUnmatch = (transactionId: string) => {
    setTransactions(transactions.map(t => 
      t.id === transactionId 
        ? { ...t, matchedExpense: null } 
        : t
    ));
  };

  const selectedTransaction = transactions.find(t => t.id === selectedTransactionId) || transactions[0];

  const handleSave = () => {
    // Save transactions logic
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Bulk Add Transactions</h2>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <div className="grid grid-cols-3 h-full">
              <div className="col-span-2 border-r border-gray-200 overflow-auto">
                <EditableTransactionGrid 
                  transactions={transactions}
                  selectedTransactionId={selectedTransactionId}
                  onTransactionSelect={setSelectedTransactionId}
                  onTransactionsChange={setTransactions}
                  onUnmatch={handleUnmatch}
                />
              </div>
              <div className="overflow-auto p-4">
                <MatchedExpensesList 
                  selectedTransaction={selectedTransaction}
                  onMatch={(expense) => handleMatch(selectedTransaction.id, expense)}
                />
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}