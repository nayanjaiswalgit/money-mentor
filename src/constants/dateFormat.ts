// Central date/time format constants and helpers for the entire UI

export const DISPLAY_DATE_FORMAT = 'dd/MM/yyyy'; // e.g., 27/04/2025
export const DISPLAY_DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'; // e.g., 27/04/2025 09:09

// Helper using Intl.DateTimeFormat for consistent formatting
export function formatDate(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  }).format(date);
}

export function formatDateTime(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  return `${formatDate(date)} ${date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })}`;
}
