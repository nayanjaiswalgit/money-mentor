import { useState } from 'react';
import { Statement, Account } from '../types';

export function useStatements(initialStatements: Statement[]) {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const filteredStatements = selectedAccountId
    ? initialStatements.filter(statement => statement.accountId === selectedAccountId)
    : initialStatements;

  return {
    selectedAccountId,
    setSelectedAccountId,
    filteredStatements
  };
}