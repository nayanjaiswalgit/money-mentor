import React from 'react';
import { FileText, CheckCircle2, Loader2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatementProps {
  statement: {
    id: string;
    accountName: string;
    accountType: string;
    fileName: string;
    uploadDate: string;
    status: 'processed' | 'processing';
    transactions: number | null;
  };
}

export function StatementCard({ statement }: StatementProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <FileText className="h-6 w-6 text-indigo-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-gray-900">{statement.fileName}</h3>
            <p className="text-sm text-gray-500">{statement.accountName}</p>
            <p className="text-xs text-gray-400">
              Uploaded on {new Date(statement.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {statement.status === 'processed' ? (
            <>
              <div className="flex items-center text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="ml-1 text-sm">{statement.transactions} transactions</span>
              </div>
              <Link
                to={`/statements/${statement.id}/transactions`}
                className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                View Transactions
              </Link>
            </>
          ) : (
            <div className="flex items-center text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="ml-1 text-sm">Processing...</span>
            </div>
          )}
          
          <button className="p-1 hover:bg-gray-50 rounded-full">
            <Download className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}