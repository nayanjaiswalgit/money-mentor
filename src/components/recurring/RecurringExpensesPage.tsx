import React, { useState } from 'react';
import { TabSelector } from './TabSelector';
import { RecurringExpenseForm } from './form/RecurringExpenseForm';
import { ExpensesList } from './list/ExpensesList';

export function RecurringExpensesPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Recurring Expenses</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your regular payments and subscriptions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecurringExpenseForm />
          <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
          <ExpensesList type={activeTab} />
        </div>
      </div>
    </div>
  );
}