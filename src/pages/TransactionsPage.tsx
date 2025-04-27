import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { api } from '../services/api';
import type { Transaction } from '../types';
import { AddTransactionModal } from '../components/transactions/AddTransactionModal';

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onEdit, onDelete }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.account}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">₹{transaction.amount.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{transaction.is_credit ? 'Credit' : 'Debit'}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
              <button className="text-blue-600 hover:underline mr-2" onClick={() => onEdit(transaction)}>Edit</button>
              <button className="text-red-600 hover:underline" onClick={() => onDelete(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    const txs = await api.expenses.getAll();
    setTransactions(txs);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAdd = async (tx: Omit<Transaction, 'id'>) => {
    await api.expenses.create(tx);
    setShowModal(false);
    setEditingTransaction(null);
    fetchTransactions();
  };

  const handleEdit = (tx: Transaction) => {
    setEditingTransaction(tx);
    setShowModal(true);
  };

  const handleUpdate = async (tx: Omit<Transaction, 'id'>) => {
    if (!editingTransaction) return;
    await api.expenses.update(editingTransaction.id, tx);
    setShowModal(false);
    setEditingTransaction(null);
    fetchTransactions();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this transaction?')) {
      await api.expenses.delete(id);
      fetchTransactions();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => { setShowModal(true); setEditingTransaction(null); }}>
          <Plus size={20} className="mr-2" /> Add Transaction
        </button>
      </div>
      <TransactionTable transactions={transactions} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <AddTransactionModal
          onClose={() => { setShowModal(false); setEditingTransaction(null); }}
          onSubmit={editingTransaction ? handleUpdate : handleAdd}
          initialValues={editingTransaction || undefined}
        />
      )}
    </div>
  );
}
