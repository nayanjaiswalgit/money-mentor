import React from 'react';
import { ExpenseCard } from './ExpenseCard';
import { getExpenses } from '../../../utils/expenses';

interface Props {
  type: 'upcoming' | 'past';
}

const ExpensesContainer: React.FC<{ expenses: any[], type: string }> = ({ expenses, type }) => (
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