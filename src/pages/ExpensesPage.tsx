import React, { useEffect } from 'react';
import { Plus, Filter } from 'lucide-react';
import { ExpenseCard } from '../components/expenses/ExpenseCard';
import { useExpenses } from '../hooks/useExpenses';

export function ExpensesPage() {
  const {
    expenses,
    loading,
    error,
    fetchExpenses,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  if (loading) {
    return <div className="p-6">Loading expenses...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter size={20} className="mr-2 text-gray-500" />
            Filter
          </button>
          <button 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => {/* TODO: Implement add expense modal */}}
          >
            <Plus size={20} className="mr-2" />
            Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onEdit={(updatedExpense) => updateExpense(expense.id, updatedExpense)}
            onDelete={() => deleteExpense(expense.id)}
          />
        ))}
      </div>
    </div>
  );
}