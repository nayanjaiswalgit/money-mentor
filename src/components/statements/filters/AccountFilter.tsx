import React from 'react';
import { Filter } from 'lucide-react';

export function AccountFilter() {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center">
        <Filter className="h-5 w-5 text-gray-400 mr-2" />
        <span className="text-sm text-gray-700">Filter by:</span>
      </div>
      
      <select className="rounded-md border-gray-300 text-sm">
        <option value="">All Accounts</option>
        <option value="bank">Bank Accounts</option>
        <option value="credit">Credit Cards</option>
        <option value="wallet">Wallets</option>
      </select>
      
      <select className="rounded-md border-gray-300 text-sm">
        <option value="">All Time</option>
        <option value="1m">Last Month</option>
        <option value="3m">Last 3 Months</option>
        <option value="1y">Last Year</option>
      </select>
    </div>
  );
}