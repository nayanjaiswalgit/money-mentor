import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  type?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  maxLength?: number;
  error?: string;
  className?: string;
  disabled?: boolean;
  autoComplete?: string;
}

export function FormField({
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
  error,
  className = '',
  disabled = false,
  autoComplete,
}: FormFieldProps) {
  return (
    <div className={className}>
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
          } ${error ? 'border-red-300' : ''} ${disabled ? 'bg-gray-100' : ''}`}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          maxLength={maxLength}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 