import { useState } from 'react';
import type { UploadStatus } from '../components/upload/UploadProgress';

export function useFileUpload() {
  const [uploads, setUploads] = useState<UploadStatus[]>([]);

  const uploadFiles = async (files: FileList, accountId: string) => {
    Array.from(files).forEach((file) => {
      const uploadId = Math.random().toString(36).substring(7);
      
      // Add initial upload status
      setUploads(prev => [...prev, {
        id: uploadId,
        fileName: file.name,
        progress: 0,
        status: 'uploading'
      }]);

      // Simulate file upload with progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        
        if (progress <= 100) {
          setUploads(prev => 
            prev.map(upload => 
              upload.id === uploadId
                ? { ...upload, progress }
                : upload
            )
          );
        }

        if (progress === 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploads(prev =>
              prev.map(upload =>
                upload.id === uploadId
                  ? { ...upload, status: 'completed' }
                  : upload
              )
            );
          }, 500);
        }
      }, 200);
    });
  };

  const dismissUpload = (id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  return {
    uploads,
    uploadFiles,
    dismissUpload
  };
}