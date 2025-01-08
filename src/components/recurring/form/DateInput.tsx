import React from 'react';
import { Calendar } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        First Payment Date
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
  );
}