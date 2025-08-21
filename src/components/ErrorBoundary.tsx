import React from 'react';

interface ErrorBoundaryProps {
  message?: string;
  description?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can log error info here if needed
    // console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    const { message, description, fallback, children } = this.props;
    if (this.state.hasError) {
      if (fallback) return <>{fallback}</>;
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
          <h1 className="text-2xl font-bold text-red-600 mb-2">{message || 'Something went wrong.'}</h1>
          <p className="text-gray-700 mb-4">{description || 'An unexpected error occurred. Please try refreshing the page.'}</p>
          {this.state.error && (
            <pre className="bg-red-100 text-red-800 p-2 rounded text-xs max-w-xl overflow-x-auto">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary; 