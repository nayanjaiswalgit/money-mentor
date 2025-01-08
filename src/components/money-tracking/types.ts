export interface Transaction {
  id: string;
  type: 'lend' | 'borrow';
  amount: number;
  person: string;
  date: string;
  dueDate?: string;
  description: string;
  status: 'pending' | 'partially_paid' | 'paid';
  payments?: Payment[];
}

export interface Payment {
  id: string;
  amount: number;
  date: string;
  method: 'cash' | 'online' | 'bank';
}

export interface MoneyTrackingSummary {
  totalLent: number;
  totalBorrowed: number;
  pendingToReceive: number;
  pendingToPay: number;
}