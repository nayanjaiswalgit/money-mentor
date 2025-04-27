import React, { useEffect, useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { ExpenseCard } from '../components/expenses/ExpenseCard';
import { AddExpenseModal } from '../components/expenses/AddExpenseModal';
import { useExpenses } from '../hooks/useExpenses';

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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Transaction | null>(null);

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
            onClick={() => setShowAddModal(true)}
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
              setShowEditModal(true);
            }}
            onDelete={async () => {
              if (window.confirm('Are you sure you want to delete this expense?')) {
                await deleteExpense(expense.id);
                fetchExpenses();
              }
            }}
          />
        ))}
      </div>

      {showAddModal && (
        <AddExpenseModal
          onClose={() => setShowAddModal(false)}
          onAdd={async (expense) => {
            await addExpense(expense);
            setShowAddModal(false);
            fetchExpenses();
          }}
        />
      )}

      {showEditModal && editingExpense && (
        <AddExpenseModal
          onClose={() => {
            setShowEditModal(false);
            setEditingExpense(null);
          }}
          onAdd={async (expense) => {
            await updateExpense(editingExpense.id, expense);
            setShowEditModal(false);
            setEditingExpense(null);
            fetchExpenses();
          }}
          initialValues={editingExpense}
        />
      )}
    </div>
  );
}