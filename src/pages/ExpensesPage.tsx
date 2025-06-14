import React, { useEffect, useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { ExpenseCard } from '../components/expenses/ExpenseCard';
import { AddExpenseModal } from '../components/expenses/AddExpenseModal';
import { useExpenses } from '../hooks/useExpenses';
import type { Transaction } from '../types';

export function ExpensesPage() {
  const {
    expenses,
    loading,
    error,
    fetchExpenses,
    updateExpense,
    deleteExpense,
    addExpense,
  } = useExpenses();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Transaction | null>(null);

  const handleAddExpense = async (expense: Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    await addExpense(expense);
    setShowAddModal(false);
  };

  const handleUpdateExpense = async (expense: Partial<Omit<Transaction, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, expense);
      setEditingExpense(null);
    }
    setShowAddModal(false); // Close modal after update
  };

  const handleDeleteExpense = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense(id);
    }
  };

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
            onClick={() => { setEditingExpense(null); setShowAddModal(true); }}
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
            onEdit={() => {
              setEditingExpense(expense);
              setShowAddModal(true); // Reuse Add/Edit modal
            }}
            onDelete={() => handleDeleteExpense(expense.id)}
          />
        ))}
      </div>

      {showAddModal && (
        <AddExpenseModal
          onClose={() => { setShowAddModal(false); setEditingExpense(null); }}
          onAdd={editingExpense ? handleUpdateExpense : handleAddExpense}
          initialValues={editingExpense || undefined}
        />
      )}
    </div>
  );
}