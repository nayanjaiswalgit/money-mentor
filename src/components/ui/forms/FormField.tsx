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
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
  onBlur,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-medium text-gray-500">
        {label}
      </label>
      <div className="relative mt-1">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            block w-full border-0 border-b bg-transparent py-1.5 sm:text-sm sm:leading-6 transition-colors duration-200
            focus:ring-0 focus:outline-none
            ${Icon ? 'pl-7' : 'pl-0'}
            ${disabled ? 'text-gray-500' : 'text-gray-900'}
            ${error 
              ? 'border-red-500' 
              : 'border-gray-300 hover:border-gray-400 focus:border-indigo-500'
            }
          `}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          maxLength={maxLength}
          disabled={disabled}
          autoComplete={autoComplete}
          onBlur={onBlur}
        />
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
} 