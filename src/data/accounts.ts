import type { Account, Card } from '../types';

export const accounts: Account[] = [
  {
    id: '1',
    name: 'Primary Savings',
    bankName: 'HDFC Bank',
    balance: 85000,
    accountType: 'savings',
  },
  {
    id: '2',
    name: 'Salary Account',
    bankName: 'ICICI Bank',
    balance: 40000,
    accountType: 'checking',
  },
];

export const cards: Card[] = [
  {
    id: '1',
    name: 'Rewards Credit Card',
    bank: 'HDFC Bank',
    lastFourDigits: '4589',
    limit: 100000,
    spent: 35000,
  },
  {
    id: '2',
    name: 'Travel Card',
    bank: 'ICICI Bank',
    lastFourDigits: '7823',
    limit: 150000,
    spent: 42000,
  },
];