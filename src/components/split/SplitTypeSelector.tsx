import React from 'react';
import { DivideSquare, Percent, Settings2 } from 'lucide-react';

interface Props {
  value: 'equal' | 'percentage' | 'custom';
  onChange: (value: 'equal' | 'percentage' | 'custom') => void;
}

export function SplitTypeSelector({ value, onChange }: Props) {
  const options = [
    { value: 'equal', label: 'Split Equally', icon: DivideSquare },
    { value: 'percentage', label: 'Split by Percentage', icon: Percent },
    { value: 'custom', label: 'Custom Split', icon: Settings2 },
  ] as const;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Split Type</label>
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex flex-col items-center p-3 border rounded-lg ${
              value === option.value
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <option.icon className="h-6 w-6 mb-1" />
            <span className="text-sm">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}