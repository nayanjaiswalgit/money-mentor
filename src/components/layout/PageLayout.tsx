import React from 'react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  actions?: React.ReactNode;
}

export function PageLayout({
  title,
  subtitle,
  children,
  className = '',
  headerClassName = '',
  contentClassName = '',
  actions,
}: PageLayoutProps) {
  return (
    <div className={`py-6 ${className}`}>
      <div className={`mb-6 ${headerClassName}`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center space-x-4">
              {actions}
            </div>
          )}
        </div>
      </div>
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
} 