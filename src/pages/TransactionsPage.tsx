import React, { useState } from 'react';
import { Filter, Download, Plus } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'credit' | 'debit';
  account: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Description
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Category
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Account
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(transaction.date).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {transaction.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {transaction.category}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {transaction.account}
            </td>
            <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
              transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
            }`}>
              {transaction.type === 'credit' ? '+' : '-'}₹
              {transaction.amount.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = () => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      description: 'New Transaction',
      category: 'Misc',
      amount: 1000,
      type: 'debit',
      account: 'New Account',
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Add Transaction
        </button>
      </div>
      {/* <TransactionTable transactions={transactions} /> */}
      <div className="text-gray-500">Connect to API for transactions data.</div>
    </div>
  );
}
