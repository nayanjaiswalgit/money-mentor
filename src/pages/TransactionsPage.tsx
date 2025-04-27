import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { api } from '../services/api';
import type { Transaction } from '../types';
import { AddTransactionModal } from '../components/transactions/AddTransactionModal';

const columns = ['Date', 'Description', 'Account', 'Amount', 'Type', 'Actions'];

const TransactionTable = ({
  transactions,
  onEdit,
  onDelete,
}: {
  transactions: Transaction[];
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
}) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>{columns.map(col => (
        <th key={col} className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">{col}</th>
      ))}</tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {transactions.map(tx => (
        <tr key={tx.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 text-sm text-gray-500">{new Date(tx.date).toLocaleDateString()}</td>
          <td className="px-6 py-4 text-sm font-medium">{tx.description}</td>
          <td className="px-6 py-4 text-sm text-gray-500">{tx.account}</td>
          <td className="px-6 py-4 text-sm font-medium text-right">₹{tx.amount.toLocaleString()}</td>
          <td className="px-6 py-4 text-sm text-right">{tx.is_credit ? 'Credit' : 'Debit'}</td>
          <td className="px-6 py-4 text-sm text-right">
            <button className="text-blue-600 hover:underline mr-2" onClick={() => onEdit(tx)}>Edit</button>
            <button className="text-red-600 hover:underline" onClick={() => onDelete(tx.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    const data = await api.expenses.getAll();
    setTransactions(data);
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleModal = (tx: Transaction | null = null) => {
    setSelectedTx(tx);
    setModalOpen(true);
  };

  const handleSave = async (tx: Omit<Transaction, 'id'>) => {
    selectedTx
      ? await api.expenses.update(selectedTx.id, tx)
      : await api.expenses.create(tx);
    setModalOpen(false);
    setSelectedTx(null);
    fetchTransactions();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this transaction?')) {
      await api.expenses.delete(id);
      fetchTransactions();
    }
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
      <TransactionTable
        transactions={transactions}
        onEdit={handleModal}
        onDelete={handleDelete}
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
