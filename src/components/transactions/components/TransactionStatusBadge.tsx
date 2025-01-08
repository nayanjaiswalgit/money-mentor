import React from 'react';
import { Unlink } from 'lucide-react';

interface Props {
  isMatched: boolean;
  onUnmatch?: () => void;
}

export function TransactionStatusBadge({ isMatched, onUnmatch }: Props) {
  return (
    <div className="flex items-center space-x-2">
      {isMatched ? (
        <>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Matched
          </span>
          {onUnmatch && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUnmatch();
              }}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            >
              <Unlink className="h-4 w-4" />
            </button>
          )}
        </>
      ) : (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Unmatched
        </span>
      )}
    </div>
  );
}