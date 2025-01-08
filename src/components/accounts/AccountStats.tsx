import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

export function AccountStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        title="Total Balance"
        amount={4150.20}
        icon={DollarSign}
        trend="up"
        percentage={12.5}
      />
      <StatCard 
        title="Monthly Income"
        amount={6240.00}
        icon={TrendingUp}
        trend="up"
        percentage={8.2}
      />
      <StatCard 
        title="Monthly Expenses"
        amount={2089.80}
        icon={TrendingDown}
        trend="down"
        percentage={5.1}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  amount: number;
  icon: React.ElementType;
  trend: 'up' | 'down';
  percentage: number;
}

function StatCard({ title, amount, icon: Icon, trend, percentage }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className="p-2 bg-indigo-50 rounded-lg">
          <Icon className="h-6 w-6 text-indigo-600" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900">{title}</h3>
      </div>
      
      <p className="mt-4 text-2xl font-semibold text-gray-900">
        ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </p>
      
      <div className="mt-2 flex items-center">
        <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? '↑' : '↓'} {percentage}%
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  );
}