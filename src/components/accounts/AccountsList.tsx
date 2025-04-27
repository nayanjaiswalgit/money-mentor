import { CreditCard, Wallet, Building2 } from 'lucide-react';
import { useAccounts } from '../../hooks/useAccounts';
import { Account } from '../../types';
import { ElementType } from 'react';
import { DataList } from '../ui/DataList';
import { StatsCard } from '../ui/StatsCard';

export function AccountsList() {
  const { data: accounts, isLoading, error, refetch } = useAccounts();

  const getAccountIcon = (type: string): ElementType => {
    switch (type) {
      case 'bank':
        return Building2;
      case 'credit':
        return CreditCard;
      case 'wallet':
        return Wallet;
      default:
        return Building2;
    }
  };
  const renderAccount = (account: Account) => (
    <StatsCard
      key={account.id}
      title={account.name}
      value={account.balance}
      icon={getAccountIcon(account.accountType)}
      prefix="$"
      subtitle={account.bankName}
    />
  );

  return (
    <DataList<Account>
      data={accounts}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      renderItem={renderAccount}
      emptyMessage="No accounts found"
      className="h-48"
    />
  );
}