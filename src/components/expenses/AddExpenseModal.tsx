import React, { useState, useEffect } from 'react';
import type { Transaction, Account } from '../../types';
import { api } from '../../services/api';

interface AddExpenseModalProps {
  onClose: () => void;
  onAdd: (expense: Omit<Transaction, 'id'>) => Promise<void>;
  initialValues?: Partial<Transaction>;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onClose, onAdd, initialValues }) => {
  const [form, setForm] = useState<Omit<Transaction, 'id'>>({
    user: '',
    account: '',
    amount: 0,
    is_credit: false,
    date: new Date().toISOString().slice(0, 10),
    description: '',
    expenses: [],
    ...(initialValues || {})
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    api.accounts.getAll().then(setAccounts);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onAdd(form);
    } catch (err: any) {
      setError(err.message || 'Failed to add expense.');
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
            <select name="account" value={form.account} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
              <option value="">Select account</option>
              {accounts.map((acc) => (
                <option key={acc.id} value={acc.id}>{acc.account_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Credit?</label>
            <input type="checkbox" name="is_credit" checked={form.is_credit} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expenses (IDs, comma separated)</label>
            <input type="text" name="expenses" value={form.expenses?.join(',') || ''} onChange={e => setForm(prev => ({ ...prev, expenses: e.target.value.split(',').map(v => v.trim()).filter(Boolean) }))} className="w-full border rounded px-3 py-2" />
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
