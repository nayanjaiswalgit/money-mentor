import React from 'react';
import { AccountButton } from './components/AccountButton';
import { Account } from './types';

interface Props {
  accounts: Account[];
  selectedAccountId: string | null;
  onSelectAccount: (accountId: string) => void;
}

export function AccountGrid({ accounts, selectedAccountId, onSelectAccount }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {accounts.map((account) => (
        <AccountButton
          key={account.id}
          account={account}
          isSelected={selectedAccountId === account.id}
          onClick={() => onSelectAccount(account.id)}
        />
      ))}
    </div>
  );
}