import React from 'react';
import { Building2, CreditCard, Wallet } from 'lucide-react';
import { Account } from '../types';

interface Props {
  account: Account;
  isSelected: boolean;
  onClick: () => void;
}

const iconMap = {
  bank: Building2,
  credit: CreditCard,
  wallet: Wallet
} as const;

export function AccountButton({ account, isSelected, onClick }: Props) {
  const Icon = iconMap[account.type];

  return (
    <button
      onClick={onClick}
      className={`flex items-center p-4 border rounded-lg transition-colors ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-200 hover:bg-gray-50'
      }`}
    >
      <Icon className="h-6 w-6 text-gray-400" />
      <div className="ml-3 text-left">
        <p className="text-sm font-medium text-gray-900">{account.name}</p>
        {account.lastStatement && (
          <p className="text-xs text-gray-500">
            Last statement: {account.lastStatement}
          </p>
        )}
      </div>
    </button>
  );
}