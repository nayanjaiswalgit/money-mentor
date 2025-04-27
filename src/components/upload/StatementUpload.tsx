import React, { useState } from 'react';
import { Upload, FileText, Check, X } from 'lucide-react';

export function StatementUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      // Only allow PDF or CSV
      if (!['application/pdf', 'text/csv'].includes(file.type) && !file.name.endsWith('.csv')) {
        setUploadError('Only PDF or CSV files are allowed');
        setSelectedFile(null);
        setPreview(null);
        setUploadSuccess(false);
        return;
      }
      setSelectedFile(file);
      setPreview({ name: file.name });
      setUploadSuccess(false);
      setUploadError(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview({ name: file.name });
      setUploadSuccess(false);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);
    try {
      // Use the new API service method
      // @ts-ignore
      await import('../../services/api').then(m => m.api.statements.upload(selectedFile));
      setUploadSuccess(true);
    } catch (err: any) {
      setUploadError(err.message || 'Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
          isDragging ? 'border-indigo-500 bg-indigo-100 animate-pulse' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
              <span>Upload a file</span>
              <input type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.csv" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">PDF, CSV up to 10MB</p>
        </div>
      </div>

      {preview && (
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Preview</h3>
          <div className="mt-4 bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-900">{preview.name}</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    onClick={handleUpload}
                    disabled={uploading}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                  <button
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    onClick={() => {
                      setPreview(null);
                      setSelectedFile(null);
                      setUploadSuccess(false);
                      setUploadError(null);
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </button>
                </div>
              </div>
              {uploadSuccess && (
                <div className="mt-4 text-green-600">Upload successful!</div>
              )}
              {uploadError && (
                <div className="mt-4 text-red-600">{uploadError}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}