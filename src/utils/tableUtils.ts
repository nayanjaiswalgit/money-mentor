// Utility functions for table editing and merging
import { SheetData } from '../pages/hooks/useSheetUpload';

// Flattens nested columns (objects/arrays) into dot notation keys
export function flattenRow(row: Record<string, any>, prefix = ''): Record<string, any> {
  let result: Record<string, any> = {};
  for (const key in row) {
    const value = row[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      result = { ...result, ...flattenRow(value, newKey) };
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

export function flattenSheet(sheet: SheetData): SheetData {
  // Flatten all rows and recompute columns
  const flatData = sheet.data.map((row: Record<string, any>) => flattenRow(row));
  const allColumns = Array.from(new Set(flatData.flatMap((row: Record<string, any>) => Object.keys(row))));
  return { columns: allColumns, data: flatData };
}

export function cleanSheet(sheet: SheetData): SheetData {
  // Flatten nested columns first
  const flatSheet = flattenSheet(sheet);
  // Remove null/empty/duplicate columns
  const filteredColumns = Array.from(new Set(flatSheet.columns.filter(c => c && String(c).trim() !== '' && c !== 'null')));
  const newData = flatSheet.data.map(row => {
    const newRow: Record<string, any> = {};
    for (const col of filteredColumns) {
      newRow[col] = row[col] ?? '';
    }
    return newRow;
  });
  return { columns: filteredColumns, data: newData };
}

export function mergeSheets(sheets: SheetData[]): SheetData {
  if (sheets.length === 0) return { columns: [], data: [] };
  // Flatten and clean all sheets
  const cleaned = sheets.map(cleanSheet);
  const allColumns = Array.from(new Set(cleaned.flatMap((s: SheetData) => s.columns)));
  const mergedData = cleaned.flatMap(sheet =>
    sheet.data.map(row => {
      const newRow: Record<string, any> = {};
      for (const col of allColumns) {
        newRow[col] = row[col] ?? '';
      }
      return newRow;
    })
  );
  return { columns: allColumns, data: mergedData };
}

export function deleteRow(sheet: SheetData, rowIdx: number): SheetData {
  return {
    columns: sheet.columns,
    data: sheet.data.filter((_, idx) => idx !== rowIdx),
  };
}

export function deleteColumn(sheet: SheetData, colName: string): SheetData {
  const colIdx = sheet.columns.indexOf(colName);
  if (colIdx === -1) return sheet;
  const newColumns = sheet.columns.filter(col => col !== colName && col && String(col).trim() !== '' && col !== 'null');
  const newData = sheet.data.map(row => {
    const newRow = { ...row };
    delete newRow[colName];
    return newRow;
  });
  return { columns: newColumns, data: newData };
}

export function updateCell(sheet: SheetData, rowIdx: number, colName: string, value: any): SheetData {
  const newData = sheet.data.map((row, idx) =>
    idx === rowIdx ? { ...row, [colName]: value } : row
  );
  return { columns: sheet.columns, data: newData };
}
