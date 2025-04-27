import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message: string;
  retry?: () => void;
  className?: string;
  fullPage?: boolean;
}

export function ErrorState({
  title = 'Error',
  message,
  retry,
  className = '',
  fullPage = false,
}: ErrorStateProps) {
  const containerClasses = fullPage
    ? 'min-h-screen flex flex-col items-center justify-center p-4'
    : 'p-4';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-lg w-full">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-sm font-medium text-red-800">{title}</h3>
        </div>
        <div className="mt-2 text-sm text-red-700">
          <p>{message}</p>
        </div>
        {retry && (
          <div className="mt-4">
            <button
              onClick={retry}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 