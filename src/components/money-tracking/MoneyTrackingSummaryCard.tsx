import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock, AlertCircle } from 'lucide-react';

export function MoneyTrackingSummaryCard() {
  const summary = {
    totalLent: 1250.00,
    totalBorrowed: 450.00,
    pendingToReceive: 850.00,
    pendingToPay: 200.00,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <SummaryItem
        title="Total Lent"
        amount={summary.totalLent}
        icon={ArrowUpRight}
        color="text-green-600"
        bgColor="bg-green-50"
      />
      <SummaryItem
        title="Total Borrowed"
        amount={summary.totalBorrowed}
        icon={ArrowDownRight}
        color="text-red-600"
        bgColor="bg-red-50"
      />
      <SummaryItem
        title="Pending to Receive"
        amount={summary.pendingToReceive}
        icon={Clock}
        color="text-yellow-600"
        bgColor="bg-yellow-50"
      />
      <SummaryItem
        title="Pending to Pay"
        amount={summary.pendingToPay}
        icon={AlertCircle}
        color="text-orange-600"
        bgColor="bg-orange-50"
      />
    </div>
  );
}

interface SummaryItemProps {
  title: string;
  amount: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

function SummaryItem({ title, amount, icon: Icon, color, bgColor }: SummaryItemProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <h3 className="ml-3 text-sm font-medium text-gray-900">{title}</h3>
      </div>
      <p className={`mt-4 text-2xl font-semibold ${color}`}>
        ${amount.toFixed(2)}
      </p>
    </div>
  );
}