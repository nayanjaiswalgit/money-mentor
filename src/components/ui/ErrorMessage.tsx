import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message?: string;
  className?: string;
  retry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = 'An error occurred. Please try again later.',
  className = '',
  retry,
}) => {
  return (
    <div className={`text-red-500 p-4 rounded-md bg-red-50 ${className}`}>
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span>{message}</span>
      </div>
      {retry && (
        <button
          onClick={retry}
          className="mt-2 text-sm text-red-700 hover:text-red-900 underline"
        >
          Try again
        </button>
      )}
    </div>
  );
}; 