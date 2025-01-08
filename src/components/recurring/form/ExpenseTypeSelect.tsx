import React from 'react';
import { CreditCard, Home, Briefcase, Shield } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ExpenseTypeSelect({ value, onChange }: Props) {
  const types = [
    { id: 'emi', label: 'EMI', icon: CreditCard },
    { id: 'rent', label: 'Rent', icon: Home },
    { id: 'investment', label: 'Investment', icon: Briefcase },
    { id: 'insurance', label: 'Insurance', icon: Shield },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Expense Type
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {types.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => onChange(type.id)}
            className={`flex flex-col items-center p-3 border rounded-lg ${
              value === type.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <type.icon className="h-6 w-6 mb-1" />
            <span className="text-sm">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}