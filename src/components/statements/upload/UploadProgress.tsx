import React from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

export function UploadProgress() {
  return (
    <div className="mt-4">
      <div className="flex items-center">
        <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
        <span className="ml-2 text-sm text-gray-600">Uploading statement...</span>
      </div>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-indigo-600 h-2.5 rounded-full w-2/3"></div>
      </div>
    </div>
  );
}