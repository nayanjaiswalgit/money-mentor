import React from 'react';
import { Transaction } from '../types';
import { TransactionStatusBadge } from './TransactionStatusBadge';

interface Props {
  transaction: Transaction;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (field: keyof Transaction, value: any) => void;
  onUnmatch?: () => void;
}

export function TransactionRow({ 
  transaction, 
  isSelected, 
  onSelect, 
  onChange,
  onUnmatch 
}: Props) {
  return (
    <tr 
      onClick={onSelect}
      className={`hover:bg-gray-50 cursor-pointer ${
        isSelected ? 'bg-indigo-50' : ''
      }`}
    >
      <td className="px-6 py-2">
        <input
          type="date"
          value={transaction.date}
          onChange={(e) => onChange('date', e.target.value)}
          className="block w-full border-0 bg-transparent focus:ring-0 text-sm"
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="px-6 py-2">
        <input
          type="text"
          value={transaction.description}
          onChange={(e) => onChange('description', e.target.value)}
          className="block w-full border-0 bg-transparent focus:ring-0 text-sm"
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="px-6 py-2">
        <input
          type="number"
          value={Math.abs(transaction.amount)}
          onChange={(e) => onChange('amount', -Math.abs(parseFloat(e.target.value)))}
          className="block w-full border-0 bg-transparent focus:ring-0 text-sm"
          step="0.01"
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="px-6 py-2">
        <input
          type="text"
          value={transaction.category || ''}
          onChange={(e) => onChange('category', e.target.value)}
          className="block w-full border-0 bg-transparent focus:ring-0 text-sm"
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="px-6 py-2 text-sm">
        <TransactionStatusBadge 
          isMatched={!!transaction.matchedExpense}
          onUnmatch={onUnmatch}
        />
      </td>
    </tr>
  );
}