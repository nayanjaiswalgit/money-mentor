export interface MonthlyAccountSummary {
  id: string;
  user: string;
  account: string;
  month: string; // YYYY-MM-DD
  end_balance: string;
  income: string;
  created_at: string;
}
