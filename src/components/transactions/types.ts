export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category?: string;
  matchedExpense: {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: string;
  } | null;
}