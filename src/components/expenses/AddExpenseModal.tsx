import React, { useState, useEffect } from 'react';
import type { Transaction, Account } from '../../types';
import api, { accountAPI, transactionAPI } from '../../services/api';

interface AddExpenseModalProps {
  onClose: () => void;
  onAdd: (expense: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  initialValues?: Partial<Omit<Transaction, 'userId' | 'createdAt' | 'updatedAt'>>;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onClose, onAdd, initialValues }) => {
  const [form, setForm] = useState<Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>({
    accountId: initialValues?.accountId || '',
    amount: initialValues?.amount || 0,
    type: initialValues?.type || 'expense', // Explicitly type as 'expense' or 'income'
    category: initialValues?.category || '',
    description: initialValues?.description || '',
    date: initialValues?.date || new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await accountAPI.getAccounts();
        setAccounts(response.data.results || []);
      } catch (err) {
        console.error('Failed to fetch accounts:', err);
        setError('Failed to load accounts.');
      }
    };
    fetchAccounts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'amount') {
      setForm((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else if (name === 'type') {
      // Explicitly cast the value to the correct union type
      setForm((prev) => ({ ...prev, [name]: value as 'income' | 'expense' }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // For adding/updating expenses, ensure type is 'expense'
      const expensePayload = { ...form, type: 'expense' as 'expense' };
      await onAdd(expensePayload);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save expense.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">{initialValues ? 'Edit Expense' : 'Add Expense'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input type="text" name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input type="number" name="amount" value={form.amount} onChange={handleChange} className="w-full border rounded px-3 py-2" min="0" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Account</label>
            <select name="accountId" value={form.accountId} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
              <option value="">Select account</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>{acc.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input type="text" name="category" value={form.category} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : (initialValues ? 'Update Expense' : 'Add Expense')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
