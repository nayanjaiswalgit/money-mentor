import React from 'react';
import { Building2, CreditCard, Wallet } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  type: 'bank' | 'credit' | 'wallet';
}

const accounts: Account[] = [
  { id: '1', name: 'Main Checking', type: 'bank' },
  { id: '2', name: 'Travel Card', type: 'credit' },
  { id: '3', name: 'Cash Wallet', type: 'wallet' },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function AccountSelect({ value, onChange }: Props) {
  const getIcon = (type: Account['type']) => {
    switch (type) {
      case 'bank': return Building2;
      case 'credit': return CreditCard;
      case 'wallet': return Wallet;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Select Account
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="">Choose an account</option>
        {accounts.map((account) => {
          const Icon = getIcon(account.type);
          return (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}