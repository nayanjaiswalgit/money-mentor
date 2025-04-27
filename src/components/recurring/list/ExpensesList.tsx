import React from 'react';
import { ExpenseCard } from './ExpenseCard';

interface Props {
  type: 'upcoming' | 'past';
}

const getExpenses = (type: 'upcoming' | 'past') => {
  // TODO: Fetch expenses from API
  return [];
};

const ExpensesContainer: React.FC<{
  expenses: Expense[];
  type: 'upcoming' | 'past';
}> = ({ expenses, type }) => (
  <div className="space-y-4 mt-6">
    {expenses.length === 0 ? (
      <div className="text-center text-gray-500">No {type} expenses found</div>
    ) : (
      expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))
    )}
  </div>
);

export function ExpensesList({ type }: Props) {
  const expenses = getExpenses(type);

  return <ExpensesContainer expenses={expenses} type={type} />;
}