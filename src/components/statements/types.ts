export interface Account {
  id: string;
  name: string;
  type: 'bank' | 'credit' | 'wallet';
  lastStatement?: string;
}

export interface Statement {
  id: string;
  accountId: string;
  fileName: string;
  uploadDate: string;
  status: 'processed' | 'processing';
  transactions: number | null;
}

export const accounts: Account[] = [
  { id: '1', name: 'Main Checking', type: 'bank', lastStatement: '2024-02' },
  { id: '2', name: 'Savings Account', type: 'bank', lastStatement: '2024-02' },
  { id: '3', name: 'Travel Rewards Card', type: 'credit', lastStatement: '2024-02' },
  { id: '4', name: 'Shopping Card', type: 'credit', lastStatement: '2024-02' },
  { id: '5', name: 'Cash Wallet', type: 'wallet' },
  { id: '6', name: 'Digital Wallet', type: 'wallet' },
];