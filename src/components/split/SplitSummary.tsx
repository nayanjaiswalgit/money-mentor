import React from 'react';
import { ArrowRight } from 'lucide-react';

export function SplitSummary() {
  const settlements = [
    { from: 'John', to: 'You', amount: 25.50 },
    { from: 'Sarah', to: 'You', amount: 15.75 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Settlement Summary</h2>
      
      <div className="space-y-4">
        {settlements.map((settlement, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-900">{settlement.from}</span>
              <ArrowRight className="h-4 w-4 mx-2 text-gray-400" />
              <span className="text-sm font-medium text-gray-900">{settlement.to}</span>
            </div>
            <span className="text-sm font-semibold text-indigo-600">
              ${settlement.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Total to receive</h3>
        <p className="text-2xl font-semibold text-gray-900">
          ${settlements.reduce((sum, s) => sum + s.amount, 0).toFixed(2)}
        </p>
      </div>
    </div>
  );
}