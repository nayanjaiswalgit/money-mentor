import React from 'react';
import { Unlink } from 'lucide-react';
import { Transaction } from './types';

interface Props {
  transactions: Transaction[];
  selectedTransactionId: string | null;
  onTransactionSelect: (id: string) => void;
  onTransactionsChange: (transactions: Transaction[]) => void;
  onUnmatch: (id: string) => void;
}

export function EditableTransactionGrid({ 
  transactions, 
  selectedTransactionId,
  onTransactionSelect,
  onTransactionsChange,
  onUnmatch 
}: Props) {
  const handleCellChange = (id: string, field: keyof Transaction, value: any) => {
    const updatedTransactions = transactions.map(t => 
      t.id === id ? { ...t, [field]: value } : t
    );
    onTransactionsChange(updatedTransactions);
  };

  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr 
              key={transaction.id} 
              onClick={() => onTransactionSelect(transaction.id)}
              className={`hover:bg-gray-50 cursor-pointer ${
                selectedTransactionId === transaction.id ? 'bg-indigo-50' : ''
              }`}
            >
              <td className="px-6 py-2">
                <input
                  type="date"
                  value={transaction.date}
                  onChange={(e) => handleCellChange(transaction.id, 'date', e.target.value)}
                  className="block w-full border-0 bg-transparent focus:ring-0 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="px-6 py-2">
                <input
                  type="text"
                  value={transaction.description}
                  onChange={(e) => handleCellChange(transaction.id, 'description', e.target.value)}
                  className="block w-full border-0 bg-transparent focus:ring-0 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="px-6 py-2">
                <input
                  type="number"
                  value={Math.abs(transaction.amount)}
                  onChange={(e) => handleCellChange(transaction.id, 'amount', -Math.abs(parseFloat(e.target.value)))}
                  className="block w-full border-0 bg-transparent focus:ring-0 text-sm"
                  step="0.01"
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="px-6 py-2">
                <input
                  type="text"
                  value={transaction.category || ''}
                  onChange={(e) => handleCellChange(transaction.id, 'category', e.target.value)}
                  className="block w-full border-0 bg-transparent focus:ring-0 text-sm"
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
              <td className="px-6 py-2 text-sm">
                <div className="flex items-center space-x-2">
                  {transaction.matchedExpense ? (
                    <>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Matched
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUnmatch(transaction.id);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                      >
                        <Unlink className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Unmatched
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}