import { AccountCard } from './AccountCard';
import type { Account } from '../../types';

interface AccountsListProps {
  accounts: Account[];
  onUpload: (accountId: string, files: FileList) => void;
}

export function AccountsList({ accounts, onUpload }: AccountsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onUpload={onUpload}
        />
      ))}
    </div>
  );
}