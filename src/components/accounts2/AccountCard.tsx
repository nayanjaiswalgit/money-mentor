import React, { useState } from 'react';
import { Building2, Upload } from 'lucide-react';
import type { Account } from '../../types';

interface AccountCardProps {
  account: Account;
  onUpload: (accountId: string, files: FileList) => void;
}

export function AccountCard({ account, onUpload }: AccountCardProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onUpload(account.id, e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative bg-white rounded-xl shadow-sm p-6 transition-all ${
        isDragOver ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
    >
      {isDragOver && (
        <div className="absolute inset-0 bg-blue-50 bg-opacity-90 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <Upload size={32} className="mx-auto text-blue-600 mb-2" />
            <p className="text-blue-600 font-medium">Drop files to upload</p>
          </div>
        </div>
      )}

      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Building2 className="text-blue-600" size={24} />
        </div>
        <div className="ml-4">
          <h3 className="font-semibold text-gray-900">{account.account_name}</h3>
          <p className="text-sm text-gray-500">{account.bank_name || ''}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">Available Balance</p>
        <p className="text-2xl font-bold text-gray-900">
          ₹{account?.balance?.toLocaleString()}
        </p>
      </div>
      {/* If you want to show balance, add logic here if available from backend */}
    </div>
  );
}