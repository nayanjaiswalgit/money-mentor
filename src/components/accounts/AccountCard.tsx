import React from 'react';
import { MoreVertical, ArrowUpRight } from 'lucide-react';

interface AccountProps {
  account: {
    type: string;
    name: string;
    balance: number;
    accountNumber: string | null;
    icon: React.ElementType;
  };
}

export function AccountCard({ account }: AccountProps) {
  const Icon = account.icon;
  const isNegative = account.balance < 0;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">{account.name}</h3>
              {account.accountNumber && (
                <p className="text-sm text-gray-500">{account.accountNumber}</p>
              )}
            </div>
          </div>
          <button className="p-1 hover:bg-gray-50 rounded-full">
            <MoreVertical className="h-5 w-5 text-gray-400" />
          </button>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-500">Current Balance</p>
          <p className={`text-2xl font-semibold ${isNegative ? 'text-red-600' : 'text-gray-900'}`}>
            ${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          View Transactions
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}