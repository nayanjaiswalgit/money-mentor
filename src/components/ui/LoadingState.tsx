import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingStateProps {
  fullPage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
}

export function LoadingState({
  fullPage = false,
  size = 'md',
  message = 'Loading...',
  className = '',
}: LoadingStateProps) {
  const containerClasses = fullPage
    ? 'min-h-screen flex flex-col items-center justify-center'
    : 'flex flex-col items-center justify-center p-4';

  return (
    <div className={`${containerClasses} ${className}`}>
      <LoadingSpinner size={size} />
      {message && (
        <p className="mt-2 text-sm text-gray-500">{message}</p>
      )}
    </div>
  );
} 