import React from 'react';
import { StatementCard } from './StatementCard';
import { EmptyState } from '../components/EmptyState';
import { Statement, Account } from '../types';

interface Props {
  statements: Statement[];
  accounts: Account[];
}

export function StatementsList({ statements, accounts }: Props) {
  if (statements.length === 0) {
    return <EmptyState />;
  }

  const getAccountName = (accountId: string) => {
    return accounts.find(acc => acc.id === accountId)?.name || 'Unknown Account';
  };

  return (
    <div className="space-y-4">
      {statements.map((statement) => (
        <StatementCard
          key={statement.id}
          statement={{
            ...statement,
            accountName: getAccountName(statement.accountId)
          }}
        />
      ))}
    </div>
  );
}