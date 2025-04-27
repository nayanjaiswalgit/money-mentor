import { useMutation } from '@tanstack/react-query';
import { fetchApi } from '../../services/apiClient';

export interface SheetData {
  columns: string[];
  data: Record<string, any>[];
}

export interface SheetsResponse {
  sheets: SheetData[];
}

// Accepts an object with file and optional password
export function useSheetUpload() {
  return useMutation<SheetsResponse, Error, { file: File; password?: string }>({
    mutationFn: async ({ file, password }) => {
      const formData = new FormData();
      formData.append('file', file);
      if (password) formData.append('password', password);
      // Use fetchApi with endpoint and options
      return await fetchApi<SheetsResponse>('/sheet-upload/', {
        method: 'POST',
        body: formData,
        headers: {},
      });
    },
  });
}
