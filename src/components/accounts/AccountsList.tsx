import React from 'react';
import { CreditCard, Wallet, Building2 } from 'lucide-react';
import { AccountCard } from './AccountCard';

const accounts = [
  {
    id: 1,
    type: 'bank',
    name: 'Main Checking',
    balance: 5240.50,
    accountNumber: '****1234',
    icon: Building2,
  },
  {
    id: 2,
    type: 'credit',
    name: 'Travel Rewards Card',
    balance: -1240.30,
    accountNumber: '****5678',
    icon: CreditCard,
  },
  {
    id: 3,
    type: 'wallet',
    name: 'Cash Wallet',
    balance: 150.00,
    accountNumber: null,
    icon: Wallet,
  },
];

export function AccountsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}