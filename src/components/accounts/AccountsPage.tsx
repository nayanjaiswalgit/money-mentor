import React from 'react';
import { AccountsList } from './AccountsList';
import { AddAccountButton } from './AddAccountButton';
import { AccountStats } from './AccountStats';

export function AccountsPage() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Accounts Overview</h1>
        <AddAccountButton />
      </div>
      
      <AccountStats />
      <AccountsList />
    </div>
  );
}