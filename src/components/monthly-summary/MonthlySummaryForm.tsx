import React, { useState } from 'react';
import { useCreateMonthlyBalance } from '../../hooks/useMonthlyBalances';
import { useIncomes } from '../../hooks/useIncomes';
import { useAccounts } from '../../hooks/useAccounts';
import { useExpenses } from '../../hooks/useExpenses';
import { Calendar, DollarSign, User, TrendingUp, ArrowDownCircle } from 'lucide-react';
import { formatDate, formatDateTime } from '../../constants/dateFormat';

export function MonthlySummaryForm({ mode }: { mode?: 'balance' | 'income' | 'expense' }) {
  const { data: accounts = [] } = useAccounts();
  // Determine default date/month/year based on current date
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysToEndOfMonth = (endOfMonth.getDate() - today.getDate());
  // If within last 3 days of month, use current month/year, else use last month
  const defaultMonth = (daysToEndOfMonth <= 3) ? (today.getMonth() + 1).toString() : (today.getMonth() === 0 ? '12' : today.getMonth().toString());
  const defaultYear = (daysToEndOfMonth <= 3) ? today.getFullYear().toString() : (today.getMonth() === 0 ? (today.getFullYear() - 1).toString() : today.getFullYear().toString());
  const defaultDate = (() => {
    if (daysToEndOfMonth <= 3) {
      return today.toISOString().slice(0, 10);
    } else {
      const lastMonthDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      // If last month doesn't have this day, fallback to last day of last month
      if (lastMonthDate.getMonth() === today.getMonth() - 1 || (today.getMonth() === 0 && lastMonthDate.getMonth() === 11)) {
        return lastMonthDate.toISOString().slice(0, 10);
      } else {
        // Fallback to last day of last month
        const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        return lastDayLastMonth.toISOString().slice(0, 10);
      }
    }
  })();

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [month, setMonth] = useState(defaultMonth);
  const [year, setYear] = useState(defaultYear);
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeAccount, setIncomeAccount] = useState('');
  const [dateReceived, setDateReceived] = useState(defaultDate);
  const [expenseDate, setExpenseDate] = useState(defaultDate);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAccountId, setExpenseAccountId] = useState('');
  const [expensePaymentMethod, setExpensePaymentMethod] = useState('');
  const [expenseNotes, setExpenseNotes] = useState('');
  const [expenseTags, setExpenseTags] = useState('');

  const createBalance = useCreateMonthlyBalance();
  const { createIncome } = useIncomes();
  const { createExpense } = useExpenses();

  const handleBalanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBalance.mutate({
      account,
      balance: parseFloat(balance),
      month: parseInt(month),
      year: parseInt(year),
    });
    setAccount(''); setBalance(''); setMonth(defaultMonth); setYear(defaultYear);
  };

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createIncome.mutate({
      source: incomeSource,
      amount: parseFloat(incomeAmount),
      date: dateReceived,
      account: incomeAccount,
      type: 'income',
    });
    setIncomeSource(''); setIncomeAmount(''); setDateReceived(defaultDate); setIncomeAccount('');
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createExpense.mutate({
      date: expenseDate,
      amount: parseFloat(expenseAmount),
      description: expenseDesc,
      category: expenseCategory,
      account: expenseAccountId,
      payment_method: expensePaymentMethod,
      notes: expenseNotes,
      tags: expenseTags.split(',').map(t => t.trim()).filter(Boolean),
      type: 'expense',
    });
    setExpenseDate(defaultDate); setExpenseAmount(''); setExpenseDesc(''); setExpenseCategory('');
    setExpenseAccountId(''); setExpensePaymentMethod(''); setExpenseNotes(''); setExpenseTags('');
  };

  return (
    <div className="grid grid-cols-1 gap-8">
      {(!mode || mode === 'balance') && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add Month-End Balance</h2>
          <form onSubmit={handleBalanceSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Account</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={account}
                onChange={e => setAccount(e.target.value)}
                required
              >
                <option value="">Select account</option>
                {accounts.map((acc: any) => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Month</label>
                <input
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Month (1-12)"
                  type="number"
                  min="1"
                  max="12"
                  value={month}
                  onChange={e => setMonth(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Year"
                  type="number"
                  value={year}
                  onChange={e => setYear(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Balance</label>
              <input
                className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Balance"
                type="number"
                value={balance}
                onChange={e => setBalance(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 w-full justify-center"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Add Balance
            </button>
          </form>
        </div>
      )}
      {(!mode || mode === 'income') && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add Income</h2>
          <form onSubmit={handleIncomeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Account</label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={incomeAccount}
                onChange={e => setIncomeAccount(e.target.value)}
                required
              >
                <option value="">Select account</option>
                {accounts.map((acc: any) => (
                  <option key={acc.id} value={acc.id}>{acc.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Income Source</label>
              <input
                className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Income Source"
                value={incomeSource}
                onChange={e => setIncomeSource(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount</label>
              <input
                className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Amount"
                type="number"
                value={incomeAmount}
                onChange={e => setIncomeAmount(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Date Received</label>
                <input
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Date Received"
                  type="date"
                  value={dateReceived}
                  onChange={e => setDateReceived(e.target.value)}
                  required
                />
                <div className="text-xs text-gray-500 mt-1">{formatDate(dateReceived)}</div>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 w-full justify-center"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Add Income
            </button>
          </form>
        </div>
      )}
      {(!mode || mode === 'expense') && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Add Expense</h2>
          <form onSubmit={handleExpenseSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={expenseDate}
                  onChange={e => setExpenseDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={expenseAmount}
                  onChange={e => setExpenseAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={expenseDesc}
                  onChange={e => setExpenseDesc(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={expenseCategory}
                  onChange={e => setExpenseCategory(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Account (Bank)</label>
                <select
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={expenseAccountId}
                  onChange={e => setExpenseAccountId(e.target.value)}
                  required
                >
                  <option value="">Select account</option>
                  {accounts.map((acc: any) => (
                    <option key={acc.id} value={acc.id}>{acc.name} ({acc.bankName})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={expensePaymentMethod}
                  onChange={e => setExpensePaymentMethod(e.target.value)}
                  placeholder="e.g. UPI, Card, Netbanking"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={expenseNotes}
                  onChange={e => setExpenseNotes(e.target.value)}
                  placeholder="Any notes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tags</label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  value={expenseTags}
                  onChange={e => setExpenseTags(e.target.value)}
                  placeholder="Comma separated (e.g. food, transport)"
                />
              </div>
            </div>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Add Expense</button>
          </form>
        </div>
      )}
    </div>
  );
}
