import React from 'react';
import { X, Upload } from 'lucide-react';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (files: FileList) => void;
  accountName: string;
}

export function FileUploadModal({ isOpen, onClose, onUpload, accountName }: FileUploadModalProps) {
  if (!isOpen) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onUpload(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onUpload(e.target.files);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Upload Statement</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
        >
          <div className="mx-auto flex justify-center mb-4">
            <Upload size={32} className="text-gray-400" />
          </div>
          <p className="text-gray-600 mb-2">
            Drag and drop files here for <strong>{accountName}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf,.csv,.xlsx,.xls"
            />
            Browse Files
          </label>
          <p className="text-xs text-gray-500 mt-4">
            Supported formats: PDF, CSV, Excel
          </p>
        </div>
      </div>
    </div>
  );
}