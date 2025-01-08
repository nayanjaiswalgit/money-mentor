import React from 'react';
import { Calendar, CalendarDays, CalendarRange } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function TimeIntervalSelect({ value, onChange }: Props) {
  const intervals = [
    { id: 'weekly', label: 'Weekly', icon: Calendar },
    { id: 'monthly', label: 'Monthly', icon: CalendarDays },
    { id: 'annually', label: 'Annually', icon: CalendarRange },
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Payment Interval
      </label>
      <div className="grid grid-cols-3 gap-3">
        {intervals.map((interval) => (
          <button
            key={interval.id}
            type="button"
            onClick={() => onChange(interval.id)}
            className={`flex flex-col items-center p-3 border rounded-lg ${
              value === interval.id
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <interval.icon className="h-6 w-6 mb-1" />
            <span className="text-sm">{interval.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}