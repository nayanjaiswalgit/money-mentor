import { useMutation } from '@tanstack/react-query';
import { fetchApi } from '../services/apiClient';

export function useSheetUpload() {
  return useMutation<{ sheets: any[] }, Error, { file: File; password?: string }>({
    mutationFn: async ({ file, password }) => {
      const formData = new FormData();
      formData.append('file', file);
      if (password) formData.append('password', password);
      return await fetchApi<{ sheets: any[] }>('/sheet-upload/', {
        method: 'POST',
        body: formData,
      });
    },
  });
}
