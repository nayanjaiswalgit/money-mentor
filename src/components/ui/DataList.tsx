import React from 'react';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';

interface DataListProps<T> {
  data: T[] | undefined;
  isLoading: boolean;
  error: Error | null;
  renderItem: (item: T) => React.ReactNode;
  onRetry?: () => void;
  emptyMessage?: string;
  loadingSize?: 'sm' | 'md' | 'lg';
  className?: string;
  gridClassName?: string;
  listClassName?: string;
  loadingMessage?: string;
  errorMessage?: string;
  renderEmpty?: () => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  keyExtractor?: (item: T) => string | number;
  layout?: 'grid' | 'list';
}

export function DataList<T>({
  data,
  isLoading,
  error,
  renderItem,
  onRetry,
  emptyMessage = 'No items found',
  loadingSize = 'md',
  className = '',
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  listClassName = 'space-y-4',
  loadingMessage = 'Loading items...',
  errorMessage = 'Failed to load items',
  renderEmpty,
  renderHeader,
  renderFooter,
  keyExtractor = (item: any) => item.id,
  layout = 'grid',
}: DataListProps<T>) {
  if (isLoading) {
    return <LoadingState size={loadingSize} message={loadingMessage} className={className} />;
  }

  if (error) {
    return (
      <ErrorState
        message={errorMessage}
        retry={onRetry}
        className={className}
      />
    );
  }

  if (!data?.length) {
    if (renderEmpty) {
      return <div className={className}>{renderEmpty()}</div>;
    }
    return (
      <div className={`text-center text-gray-500 p-4 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      {renderHeader && renderHeader()}
      <div className={layout === 'grid' ? gridClassName : listClassName}>
        {data.map((item) => (
          <React.Fragment key={keyExtractor(item)}>
            {renderItem(item)}
          </React.Fragment>
        ))}
      </div>
      {renderFooter && renderFooter()}
    </div>
  );
} 