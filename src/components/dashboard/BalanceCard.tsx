import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface BalanceCardProps {
  title: string;
  amount: number;
  trend: 'up' | 'down';
  percentage: number;
}

export function BalanceCard({ title, amount, trend, percentage }: BalanceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-bold text-gray-900">
          ₹{amount.toLocaleString()}
        </span>
        <span className={`ml-2 flex items-center text-sm ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? (
            <TrendingUp size={16} className="mr-1" />
          ) : (
            <TrendingDown size={16} className="mr-1" />
          )}
          {percentage}%
        </span>
      </div>
    </div>
  );
}