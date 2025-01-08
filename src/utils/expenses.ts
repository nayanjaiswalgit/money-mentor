interface Expense {
  id: string;
  type: 'emi' | 'rent' | 'investment' | 'insurance';
  amount: number;
  interval: string;
  nextDate: string;
  description: string;
}

export function getExpenses(type: 'upcoming' | 'past'): Expense[] {
  // This would typically fetch from an API
  return type === 'upcoming' ? [
    {
      id: '1',
      type: 'emi',
      amount: 1200,
      interval: 'monthly',
      nextDate: '2024-04-01',
      description: 'Car Loan EMI'
    },
    {
      id: '2',
      type: 'rent',
      amount: 2000,
      interval: 'monthly',
      nextDate: '2024-04-05',
      description: 'Apartment Rent'
    }
  ] : [
    {
      id: '3',
      type: 'insurance',
      amount: 150,
      interval: 'monthly',
      nextDate: '2024-03-15',
      description: 'Health Insurance'
    }
  ];
}