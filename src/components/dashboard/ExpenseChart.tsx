import React from 'react';

export function ExpenseChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Overview</h3>
        <select className="text-sm border-gray-300 rounded-md">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>Last 12 months</option>
        </select>
      </div>
      <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-500">Chart will be implemented here</p>
      </div>
    </div>
  );
}