import { AccountCard } from './AccountCard';
import { CreditCardItem } from './CreditCardItem';
import type { Account, Card } from '../../types';

interface AccountsListProps {
  accounts: Account[];
  creditCards: Card[];
  onUpload: (accountId: string) => void;
  activeTab: string;
}

export function AccountsList({ accounts, creditCards, onUpload, activeTab }: AccountsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activeTab === 'accounts' && accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onUpload={onUpload}
        />
      ))}
      {activeTab === 'cards' && creditCards.map((card) => (
        <CreditCardItem
          key={card.id}
          card={card}
          // onUpload={onUpload} // Not applicable for cards, or a different upload logic
        />
      ))}
    </div>
  );
}