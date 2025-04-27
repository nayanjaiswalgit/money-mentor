import React from 'react';
import { useSheetUploadPage } from '../hooks/useSheetUploadPage';
import SheetDataTable from './SheetDataTable';
import SheetButton from './SheetButton';
import { FileSpreadsheet, FileText, File, RotateCcw, RotateCw, ChevronDown, Layers, StretchHorizontal, StretchVertical } from 'lucide-react';
import { useState } from 'react';
import { Dropdown } from '../components/ui/Dropdown';

export const COLUMN_OPTIONS = [
  'Date', 'Account Details', 'Customer Details', 'Home Branch Details', 'Sr No', 'Particulars',
  'Cheque/Reference No', 'Debit', 'Credit', 'Balance', 'Channel', 'Opening Balance',
  'Closing Balance', 'Total Transaction Count', 'Total Debit Count', 'Total Debit Amount',
  'Total Credit Count', 'Total Credit Amount', 'Address', 'Mobile', 'KYC Complied',
  'Primary ID Type', 'Account Holder Names', 'Account Type', 'Mode of Operation',
  'MAB Required', 'Branch No', 'Phone No', 'Name'
];

// File input and PDF password field
const FileUploadSection = ({ page }: { page: ReturnType<typeof useSheetUploadPage> }) => (
  <div className="mb-4 flex items-center space-x-4">
    <div className="flex flex-col">
      <input
        type="file"
        accept=".csv,.xlsx,.xls,.pdf"
        onChange={page.handleFileChange}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      {page.pdfSelected && (
        <input
          type="password"
          value={page.pdfPassword}
          onChange={e => page.setPdfPassword(e.target.value)}
          className="border p-2 mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="PDF Password (if any)"
          style={{ minWidth: 180 }}
        />
      )}
    </div>

    <button
      className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 transition-colors"
      onClick={() => page.handleUpload()}
      disabled={!page.selectedFile || page.uploadMutation.isPending}
    >
      {page.uploadMutation.isPending ? 'Uploading...' : 'Upload'}
    </button>
  </div>
);

// Toolbar for actions
const Toolbar = ({ page }: { page: ReturnType<typeof useSheetUploadPage> }) => {
  const [exportOpen, setExportOpen] = useState(false);
  const [sheetDropdownOpen, setSheetDropdownOpen] = useState(false);

  const actions = [
    {
      text: undefined,
      onClick: page.handleUndo,
      color: '',
      disabled: page.history.length === 0 || !page.selectedFile,
      icon: <RotateCcw size={20} />,
      title: 'Undo (Ctrl+Z)',
      ariaLabel: 'Undo',
      className: 'hover:bg-gray-100'
    },
    {
      text: undefined,
      onClick: page.handleRedo,
      color: '',
      disabled: page.redoStack.length === 0 || !page.selectedFile,
      icon: <RotateCw size={20} />,
      title: 'Redo (Ctrl+Y)',
      ariaLabel: 'Redo',
      className: 'hover:bg-gray-100'
    },
    {
      text: undefined,
      onClick: () => page.setTransposedView((v: boolean) => !v),
      color: '',
      disabled: !page.selectedFile,
      icon: page.transposedView ? <StretchVertical size={20} /> : <StretchHorizontal size={20} />,
      title: page.transposedView ? 'Row View' : 'Column View',
      ariaLabel: page.transposedView ? 'Row View' : 'Column View',
      className: 'hover:bg-gray-100 !bg-transparent !shadow-none !text-gray-700'
    }
  ];

  const exportOptions = [
    {
      text: 'Excel',
      onClick: () => { setExportOpen(false); page.handleDownloadXLSX(); },
      icon: <FileSpreadsheet size={16} />,
    },
    {
      text: 'CSV (with labels)',
      onClick: () => { setExportOpen(false); page.handleDownloadCSV(undefined, true); },
      icon: <FileSpreadsheet size={16} />,
    },
    {
      text: 'PDF (with labels)',
      onClick: () => { setExportOpen(false); page.handleDownloadPDF(undefined, true); },
      icon: <File size={16} />,
    },
    {
      text: 'JSON (with labels)',
      onClick: () => {
        setExportOpen(false);
        const labeled = page.getSheetWithLabels();
        if (labeled) page.handleDownloadJSON();
      },
      icon: <FileText size={16} />,
    }
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center bg-white p-4 rounded-lg shadow border border-gray-200 sticky top-0 z-20 relative">
      {actions.map(action => (
        <SheetButton
          key={action.title}
          text={action.text}
          onClick={action.onClick}
          color={action.color}
          disabled={action.disabled}
          icon={action.icon}
          title={action.title}
          className={action.className}
          ariaLabel={action.ariaLabel}
        />
      ))}
      {/* Export Dropdown */}
      <div className="relative">
        <SheetButton
          text=""
          onClick={() => setExportOpen(v => !v)}
          color=""
          icon={<div className="flex items-center gap-1"><FileSpreadsheet size={16} />Export<ChevronDown size={16} className="ml-1" /></div>}
          title="Export options"
          className="hover:bg-gray-100 !bg-transparent !shadow-none !text-gray-700"
          disabled={!page.selectedFile}
        />
        <Dropdown isOpen={exportOpen} onClose={() => setExportOpen(false)}>
          {exportOptions.map(opt => (
            <button
              key={opt.text}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={opt.onClick}
              type="button"
              disabled={!page.selectedFile}
            >
              <span className="mr-2">{opt.icon}</span>
              {opt.text}
            </button>
          ))}
        </Dropdown>
      </div>
      {/* Sheet Management Dropdown */}
      <div className="relative">
        <SheetButton
          text=""
          onClick={() => setSheetDropdownOpen(v => !v)}
          color=""
          icon={<div className="flex items-center gap-1"><Layers size={16} />Sheets<ChevronDown size={16} className="ml-1" /></div>}
          title="Sheet actions"
          className="hover:bg-gray-100 !bg-transparent !shadow-none !text-gray-700"
          disabled={!page.selectedFile}
        />
        <Dropdown isOpen={sheetDropdownOpen} onClose={() => setSheetDropdownOpen(false)}>
          {/* Sheet switcher */}
          {page.sheets.map((_, idx) => (
            <button
              key={"sheet-" + idx}
              className={`flex items-center w-full px-4 py-2 text-sm ${page.activeSheet === idx ? 'bg-indigo-50 font-semibold text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => {
                page.setActiveSheet(idx);
                setSheetDropdownOpen(false);
              }}
              type="button"
              disabled={!page.selectedFile}
            >
              <input
                type="checkbox"
                checked={page.selectedForMerge.includes(idx)}
                onChange={e => {
                  if (e.target.checked) {
                    page.setSelectedForMerge([...page.selectedForMerge, idx]);
                  } else {
                    page.setSelectedForMerge(page.selectedForMerge.filter(i => i !== idx));
                  }
                }}
                className="mr-2"
                onClick={ev => ev.stopPropagation()} // Prevents activating the sheet when clicking checkbox
              />
              Sheet {idx + 1} {page.activeSheet === idx && <span className="ml-2">(Active)</span>}
            </button>
          ))}
          {/* Merge Button inside Dropdown */}
          {page.selectedForMerge.length > 1 && (
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-indigo-700 font-semibold hover:bg-indigo-50 border-t border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              onClick={() => {
                page.handleMergeSheets();
              setSheetDropdownOpen(false);
            }}
            type="button"
            disabled={page.selectedForMerge.length < 2}
          >
            <Layers size={16} className="mr-2" />Merge Selected
          </button>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

// Sheet table viewer
const SheetTableView = ({ page, onLabelChange }: { page: ReturnType<typeof useSheetUploadPage>, onLabelChange: (col: string, newLabel: string) => void }) => {
  const sheet = page.activeSheet !== -1 ? page.sheets[page.activeSheet] : page.mergedSheet;
  const labels = page.activeSheet !== -1
    ? page.columnLabels[page.activeSheet.toString()]
    : page.columnLabels['merged'];

  return sheet ? (
    <div className="overflow-x-auto border rounded bg-white p-4">
      <SheetDataTable
        sheet={sheet}
        columnLabels={labels}
        onCellChange={() => {}}
        transposedView={page.transposedView}
        onDeleteRow={page.handleDeleteRow}
        onDeleteColumn={page.handleDeleteColumn}
        onLabelChange={onLabelChange}
      />
    </div>
  ) : null;
};

// Toast component
const Toast: React.FC<{ message: string }> = ({ message }) => (
  <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded shadow-lg transition-opacity duration-300 animate-fade-in-out">
    {message}
  </div>
);

// Main component
const SheetUploadPage: React.FC = () => {
  const page = useSheetUploadPage();

  // Add handler for column label change
  const handleLabelChange = (col: string, newLabel: string) => {
    page.setColumnLabels((prev: any) => {
      const idx = page.activeSheet;
      return {
        ...prev,
        [idx]: {
          ...((prev && prev[idx]) || {}),
          [col]: newLabel
        }
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Sheet Upload</h2>

      {/* Toast feedback, fixed top-right */}
      {page.submitStatus && <Toast message={page.submitStatus} />}

      <FileUploadSection page={page} />

      {page.showPasswordPrompt && !page.pdfSelected && (
        <form onSubmit={page.handlePasswordSubmit} className="mb-4 flex items-center space-x-2">
          <label htmlFor="pdf-password" className="font-semibold">PDF Password:</label>
          <input
            id="pdf-password"
            type="password"
            value={page.pdfPassword}
            onChange={e => page.setPdfPassword(e.target.value)}
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="PDF Password (if any)"
            style={{ minWidth: 180 }}
          />
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 transition-colors"
            onClick={() => {/* submit logic here, e.g., call upload or set status */}}
            disabled={page.submitStatus === 'Submitted' || page.uploadMutation.isPending}
            type="button"
          >
            Submit
          </button>
        </form>
      )}

      {page.error && <div className="text-red-600 mb-4">{page.error}</div>}
      {page.uploadMutation.isPending && <div className="text-blue-600 mb-4">Uploading...</div>}

      {(page.activeSheet !== -1 || page.mergedSheet) && (
        <>
          <Toolbar page={page} />
          <SheetTableView page={page} onLabelChange={handleLabelChange} />
          {/* Submit button at the very end */}
          <div className="flex justify-end mt-4">
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 transition-colors"
              onClick={() => {/* submit logic here, e.g., call upload or set status */}}
              disabled={page.submitStatus === 'Submitted' || page.uploadMutation.isPending}
              type="button"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SheetUploadPage;
