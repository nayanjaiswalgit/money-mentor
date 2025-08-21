import { Account } from '../../app/api/accountApi';
import { Pencil, Trash2, Upload } from 'lucide-react';

interface AccountsListProps {
  accounts: Account[];
  onUpload: (accountId: string) => void;
  onUpdate: (id: string, data: Partial<Account>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  activeTab: 'accounts' | 'cards';
}

export function AccountsList({
  accounts,
  onUpload,
  onUpdate,
  onDelete,
  activeTab
}: AccountsListProps) {
  const items = activeTab === 'accounts'
    ? accounts.filter(acc => !['visa', 'mastercard', 'amex'].includes(acc.type))
    : accounts.filter(acc => ['visa', 'mastercard', 'amex'].includes(acc.type));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow p-4 border border-gray-200"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.type}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onUpdate(item.id, item)}
                className="p-1 text-gray-500 hover:text-blue-600"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-1 text-gray-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
              {activeTab === 'accounts' && (
                <button
                  onClick={() => onUpload(item.id)}
                  className="p-1 text-gray-500 hover:text-green-600"
                >
                  <Upload size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Balance</span>
              <span className="text-sm font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'currency' in item ? item.currency : 'USD'
                }).format(item.balance)}
              </span>
            </div>

            {activeTab === 'cards' && 'limit' in item && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Credit Limit</span>
                <span className="text-sm font-medium">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(item.limit)}
                </span>
              </div>
            )}

            {activeTab === 'cards' && 'due_date' in item && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Due Date</span>
                <span className="text-sm font-medium">
                  {item.due_date ? new Date(item.due_date).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            )}

            {item.institution && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Institution</span>
                <span className="text-sm font-medium">{item.institution}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}