import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div role="status" className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner; 