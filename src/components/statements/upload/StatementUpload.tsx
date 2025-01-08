import React, { useState } from 'react';
import { Upload, FileText, X, Building2, CreditCard, Wallet } from 'lucide-react';

interface Props {
  onClose: () => void;
}

interface Account {
  id: string;
  name: string;
  type: 'bank' | 'credit' | 'wallet';
  lastStatement?: string;
}

const accounts: Account[] = [
  { id: '1', name: 'Main Checking', type: 'bank', lastStatement: '2024-02' },
  { id: '2', name: 'Savings Account', type: 'bank', lastStatement: '2024-02' },
  { id: '3', name: 'Travel Rewards Card', type: 'credit', lastStatement: '2024-02' },
  { id: '4', name: 'Shopping Card', type: 'credit', lastStatement: '2024-02' },
  { id: '5', name: 'Cash Wallet', type: 'wallet' },
  { id: '6', name: 'Digital Wallet', type: 'wallet' },
];

export function StatementUpload({ onClose }: Props) {
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const getIcon = (type: Account['type']) => {
    switch (type) {
      case 'bank': return Building2;
      case 'credit': return CreditCard;
      case 'wallet': return Wallet;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file upload
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Upload Statement</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {accounts.map((account) => {
                const Icon = getIcon(account.type);
                return (
                  <button
                    key={account.id}
                    onClick={() => setSelectedAccount(account.id)}
                    className={`flex items-center p-4 border rounded-lg ${
                      selectedAccount === account.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-6 w-6 text-gray-400" />
                    <div className="ml-3 text-left">
                      <p className="text-sm font-medium text-gray-900">{account.name}</p>
                      {account.lastStatement && (
                        <p className="text-xs text-gray-500">
                          Last statement: {account.lastStatement}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedAccount && (
              <div
                className={`mt-4 border-2 border-dashed rounded-lg ${
                  isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
                }`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <div className="px-6 py-10 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-indigo-600">
                        Choose a file
                      </span>
                      <input type="file" className="hidden" accept=".pdf,.csv" />
                    </label>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF or CSV up to 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}