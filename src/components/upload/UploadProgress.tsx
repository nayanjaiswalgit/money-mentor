import React from 'react';
import { X, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export interface UploadStatus {
  id: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  error?: string;
}

interface UploadProgressProps {
  uploads: UploadStatus[];
  onDismiss: (id: string) => void;
}

export function UploadProgress({ uploads, onDismiss }: UploadProgressProps) {
  if (uploads.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden">
      {uploads.map((upload) => (
        <div key={upload.id} className="p-4 border-b last:border-b-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <FileText size={16} className="text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                {upload.fileName}
              </span>
            </div>
            <button
              onClick={() => onDismiss(upload.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-2">
            {upload.status === 'uploading' && (
              <>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${upload.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {upload.progress}% uploaded
                </span>
              </>
            )}
            
            {upload.status === 'completed' && (
              <div className="flex items-center text-green-600">
                <CheckCircle size={16} className="mr-1" />
                <span className="text-xs">Upload complete</span>
              </div>
            )}

            {upload.status === 'error' && (
              <div className="flex items-center text-red-600">
                <AlertCircle size={16} className="mr-1" />
                <span className="text-xs">{upload.error}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}