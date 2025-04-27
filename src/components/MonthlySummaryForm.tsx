import React, { useState } from 'react';
import { useCreateMonthlySummary } from '../hooks/useMonthlySummaries';
import { useAccounts } from '../hooks/useAccounts';

export function MonthlySummaryForm() {
  const { data: accounts = [] } = useAccounts();
  const createSummary = useCreateMonthlySummary();
  const [form, setForm] = useState({
    account: '',
    month: '',
    end_balance: '',
    income: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.account || !form.month || !form.end_balance || !form.income) return;
    createSummary.mutate({
      account: form.account,
      month: form.month + '-01',
      end_balance: parseFloat(form.end_balance),
      income: parseFloat(form.income),
    });
    setForm({ account: '', month: '', end_balance: '', income: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label>Account</label>
        <select name="account" value={form.account} onChange={handleChange} required>
          <option value="">Select account</option>
          {accounts.map((acc: any) => (
            <option key={acc.id} value={acc.id}>{acc.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Month</label>
        <input type="month" name="month" value={form.month} onChange={handleChange} required />
      </div>
      <div>
        <label>Month End Balance</label>
        <input type="number" name="end_balance" value={form.end_balance} onChange={handleChange} required />
      </div>
      <div>
        <label>Income</label>
        <input type="number" name="income" value={form.income} onChange={handleChange} required />
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
