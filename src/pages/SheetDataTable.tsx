import React, { memo } from 'react';
import { COLUMN_OPTIONS } from './SheetUploadPage';

interface SheetData {
  columns: string[];
  data: Record<string, any>[];
}

interface SheetDataTableProps {
  sheet: SheetData;
  columnLabels?: { [key: string]: string };
  onCellChange: (rowIdx: number, col: string, value: string) => void;
  transposedView: boolean;
  onDeleteRow: (rowIdx: number) => void;
  onDeleteColumn: (col: string) => void;
  onLabelChange: (col: string, newLabel: string) => void;
}

// Header
const SheetDataTableHeader: React.FC<{
  sheet: SheetData;
  columnLabels?: { [key: string]: string };
  transposedView: boolean;
  onDeleteColumn: (col: string) => void;
  onLabelChange: (col: string, newLabel: string) => void;
}> = ({ sheet, columnLabels, transposedView, onDeleteColumn, onLabelChange }) => (
  <thead>
    {!transposedView ? (
      <tr className="bg-gray-50">
        {sheet.columns.map((col: string) => (
          <th key={col} className="border px-2 py-1 relative group bg-gray-50">
            <div className="flex items-center gap-1">
              <select
                className={`border-none outline-none p-1 rounded w-36 font-semibold bg-white transition-colors duration-150 focus:ring-2 focus:ring-indigo-400`}
                value={(columnLabels && columnLabels[col]) || col}
                onChange={e => onLabelChange(col, e.target.value)}
              >
                <option value={col}>{col}</option>
                {COLUMN_OPTIONS.filter((opt: string) => !Object.values(columnLabels || {}).includes(opt) || (columnLabels && columnLabels[col] === opt)).map((opt: string) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 py-0 text-xs opacity-0 group-hover:opacity-100 shadow-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                onClick={() => onDeleteColumn(col)}
                title="Delete column"
                type="button"
              >×</button>
            </div>
          </th>
        ))}
      </tr>
    ) : (
      <tr className="bg-gray-50">
        <th className="border px-3 py-2 text-left text-xs font-semibold bg-gray-100 uppercase tracking-wide">Field</th>
        {sheet.data.map((_, idx: number) => (
          <th key={idx} className="border px-3 py-2 text-xs font-semibold bg-gray-50">Row {idx + 1}</th>
        ))}
      </tr>
    )}
  </thead>
);

// Row for normal view
const SheetDataTableRow: React.FC<{
  row: Record<string, any>;
  rowIdx: number;
  columns: string[];
  onCellChange: (rowIdx: number, col: string, value: string) => void;
  onDeleteRow: (rowIdx: number) => void;
}> = memo(({ row, rowIdx, columns, onCellChange, onDeleteRow }) => (
  <tr>
    {columns.map((col: string) => (
      <td key={col} className="border bg-white text-xs p-1 align-top">
        <input
          value={row[col] ?? ''}
          onChange={e => onCellChange(rowIdx, col, e.target.value)}
          className="w-24 border border-gray-200 rounded p-1 bg-white focus:bg-gray-50 focus:border-indigo-300 transition-colors text-xs"
        />
      </td>
    ))}
    <td>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded text-xs ml-2"
        onClick={() => onDeleteRow(rowIdx)}
        type="button"
      >Delete</button>
    </td>
  </tr>
));

// Row for transposed view
const SheetDataTableTransposedRow: React.FC<{
  col: string;
  columnLabel?: string;
  data: Record<string, any>[];
  colIdx: number;
  onCellChange: (rowIdx: number, col: string, value: string) => void;
}> = memo(({ col, columnLabel, data, onCellChange }) => (
  <tr>
    <td className="border px-3 py-2 text-xs font-semibold bg-gray-100">{columnLabel || col}</td>
    {data.map((row, idx: number) => (
      <td key={idx} className="border bg-white text-xs p-1 align-top">
        <input
          value={row[col] ?? ''}
          onChange={e => onCellChange(idx, col, e.target.value)}
          className="w-24 border border-gray-200 rounded p-1 bg-white focus:bg-gray-50 focus:border-indigo-300 transition-colors text-xs"
        />
      </td>
    ))}
  </tr>
));

const SheetDataTable: React.FC<SheetDataTableProps> = memo(({ sheet, columnLabels, onCellChange, transposedView, onDeleteRow, onDeleteColumn, onLabelChange }) => (
  <table className="min-w-full border">
    <SheetDataTableHeader
      sheet={sheet}
      columnLabels={columnLabels}
      transposedView={transposedView}
      onDeleteColumn={onDeleteColumn}
      onLabelChange={onLabelChange}
    />
    <tbody>
      {!transposedView
        ? sheet.data.map((row, rowIdx: number) => (
            <SheetDataTableRow
              key={rowIdx}
              row={row}
              rowIdx={rowIdx}
              columns={sheet.columns}
              onCellChange={onCellChange}
              onDeleteRow={onDeleteRow}
            />
          ))
        : sheet.columns.map((col, colIdx: number) => (
            <SheetDataTableTransposedRow
              key={col}
              col={col}
              columnLabel={columnLabels && columnLabels[col]}
              data={sheet.data}
              colIdx={colIdx}
              onCellChange={onCellChange}
            />
          ))}
    </tbody>
  </table>
));

export default SheetDataTable;
