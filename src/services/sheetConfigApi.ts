// API for submitting sheet config/mapped data
import { fetchApi } from './apiClient';
import { SheetData } from '../pages/hooks/useSheetUpload';

export async function submitSheetConfig(sheet: SheetData) {
  // You can adjust endpoint as needed
  return fetchApi('/sheet-config/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sheet),
  });
}
