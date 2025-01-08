import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  type?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
}

export function FormInput({
  id,
  label,
  value,
  onChange,
  icon: Icon,
  type = 'text',
  placeholder,
  required,
  pattern,
  maxLength,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
            Icon ? 'pl-10' : ''
          }`}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          maxLength={maxLength}
        />
      </div>
    </div>
  );
}