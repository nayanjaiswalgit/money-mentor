interface Expense {
  id: string;
  type: 'emi' | 'rent' | 'investment' | 'insurance';
  amount: number;
  interval: string;
  nextDate: string;
  description: string;
}

// Static getExpenses removed. Use API layer instead.

export {};