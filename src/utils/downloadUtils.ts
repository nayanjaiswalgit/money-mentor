import { SheetData } from '../pages/hooks/useSheetUpload';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function downloadAsExcel(sheet: SheetData, filename = 'sheet.xlsx') {
  const ws = XLSX.utils.json_to_sheet(sheet.data, { header: sheet.columns });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename);
}

export function downloadAsPDF(sheet: SheetData, filename = 'sheet.pdf') {
  const doc = new jsPDF();
  // @ts-ignore
  doc.autoTable({
    head: [sheet.columns],
    body: sheet.data.map(row => sheet.columns.map(col => row[col])),
    styles: { fontSize: 8 },
  });
  doc.save(filename);
}

export function downloadAsJSON(sheet: SheetData, filename = 'sheet.json') {
  const json = JSON.stringify(sheet, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}
