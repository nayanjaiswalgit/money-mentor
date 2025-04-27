import { useState, useCallback } from 'react';
import { useSheetTable, SheetData } from './useSheetTable';
import { cleanSheet } from '../utils/tableUtils';
import { useSheetUpload } from './useSheetUpload';

export function useSheetUploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [pdfPassword, setPdfPassword] = useState<string>('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pdfSelected, setPdfSelected] = useState(false);
  const [columnEdits, setColumnEdits] = useState<{ [sheetIdx: number]: { [key: string]: string } }>({});

  const uploadMutation = useSheetUpload();
  const {
    sheets, setSheets,
    mergedSheet, setMergedSheet,
    activeSheet, setActiveSheet,
    selectedForMerge, setSelectedForMerge,
    columnLabels, setColumnLabels,
    transposedView, setTransposedView,
    history, redoStack,
    pushHistory, handleUndo, handleRedo
  } = useSheetTable();

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setError(null);
    setPdfPassword('');
    setShowPasswordPrompt(false);
    setPendingFile(null);
    setPdfSelected(file.name.toLowerCase().endsWith('.pdf'));
    setColumnEdits({});
  }, []);

  const handleUpload = useCallback((fileOverride?: File, passwordOverride?: string) => {
    const file = fileOverride || selectedFile;
    if (!file) return;
    setError(null);
    setSubmitStatus(null);
    setShowPasswordPrompt(false);
    setPendingFile(null);
    setPdfSelected(file.name.toLowerCase().endsWith('.pdf'));
    uploadMutation.mutate({ file, password: passwordOverride || '' }, {
      onSuccess: (data: any) => {
        setSheets(data.sheets.map(cleanSheet));
        setError(null);
        setPdfPassword('');
        setShowPasswordPrompt(false);
        setPendingFile(null);
        setMergedSheet(null);
        setSelectedForMerge([]);
        pushHistory();
      },
      onError: (err: any) => {
        if (err?.message?.includes('password is incorrect')) {
          setShowPasswordPrompt(true);
          setPendingFile(file);
        } else {
          setError(err.message);
        }
      },
    });
  }, [selectedFile, setSheets, setMergedSheet, setSelectedForMerge, pushHistory]);

  const handlePasswordSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (pendingFile && pdfPassword) {
      handleUpload(pendingFile, pdfPassword);
    }
  }, [pendingFile, pdfPassword, handleUpload]);

  // --- Robust merge handler for merging selected sheets ---
  const handleMergeSheets = useCallback(() => {
    if (selectedForMerge.length < 2) return;
    // Gather sheets to merge
    const sheetsToMerge = selectedForMerge.map(idx => sheets[idx]);
    if (sheetsToMerge.length < 2) return;

    // Get all unique columns (preserve order as much as possible)
    const seen = new Set<string>();
    const allColumns: string[] = [];
    for (const sheet of sheetsToMerge) {
      for (const col of sheet.columns) {
        if (!seen.has(col)) {
          seen.add(col);
          allColumns.push(col);
        }
      }
    }

    // Merge data: align each row to allColumns, filling missing fields with empty string
    const mergedData = sheetsToMerge.flatMap(sheet =>
      sheet.data.map(row => {
        const mergedRow: Record<string, any> = {};
        for (const col of allColumns) {
          mergedRow[col] = row[col] ?? '';
        }
        return mergedRow;
      })
    );

    // Remove empty columns (columns that are empty for all rows)
    const nonEmptyColumns = allColumns.filter(col => mergedData.some(row => row[col] !== '' && row[col] !== null && row[col] !== undefined));
    const cleanedData = mergedData.map(row => {
      const cleanedRow: Record<string, any> = {};
      for (const col of nonEmptyColumns) {
        cleanedRow[col] = row[col];
      }
      return cleanedRow;
    });

    // Create new merged sheet
    const newSheet = { columns: nonEmptyColumns, data: cleanedData };
    // Remove merged sheets by index
    const remainingSheets = sheets.filter((_, idx) => !selectedForMerge.includes(idx));
    setSheets([...remainingSheets, newSheet]);
    setActiveSheet(remainingSheets.length); // new sheet is last
    setSelectedForMerge([]);
    setMergedSheet(null); // optional: clear mergedSheet state
    pushHistory();
  }, [selectedForMerge, sheets, setSheets, setActiveSheet, setSelectedForMerge, setMergedSheet, pushHistory]);

  // --- Add row and column deletion handlers ---
  const handleDeleteRow = useCallback((rowIdx: number) => {
    if (activeSheet === -1) return; // Don't allow delete in merged view
    setSheets(prevSheets => {
      const sheetsCopy = [...prevSheets];
      const sheet = { ...sheetsCopy[activeSheet], data: sheetsCopy[activeSheet].data.filter((_, idx) => idx !== rowIdx) };
      sheetsCopy[activeSheet] = sheet;
      return sheetsCopy;
    });
    pushHistory();
  }, [activeSheet, setSheets, pushHistory]);

  const handleDeleteColumn = useCallback((col: string) => {
    if (activeSheet === -1) return; // Don't allow delete in merged view
    setSheets(prevSheets => {
      const sheetsCopy = [...prevSheets];
      const sheet = {
        ...sheetsCopy[activeSheet],
        columns: sheetsCopy[activeSheet].columns.filter(c => c !== col),
        data: sheetsCopy[activeSheet].columns.filter(c => c !== col).length === 0
          ? []
          : sheetsCopy[activeSheet].data.map(row => {
              const rowCopy = { ...row };
              delete rowCopy[col];
              return rowCopy;
            })
      };
      sheetsCopy[activeSheet] = sheet;
      return sheetsCopy;
    });
    pushHistory();
  }, [activeSheet, setSheets, pushHistory]);

  // --- Toast helper ---
  const showToast = useCallback((msg: string) => {
    setSubmitStatus(msg);
    setTimeout(() => setSubmitStatus(null), 2000);
  }, [setSubmitStatus]);

  // --- Utility: get all columns from data ---
  function getAllColumns(sheet: { columns: string[], data: Record<string, any>[] }, withLabels = false, sheetIdx?: number) {
    const allColsSet = new Set(sheet.columns);
    for (const row of sheet.data) {
      Object.keys(row).forEach(k => allColsSet.add(k));
    }
    let columns = Array.from(allColsSet);
    if (withLabels) {
      const labels = columnLabels[typeof sheetIdx === 'number' ? sheetIdx : activeSheet] || {};
      columns = columns.map(col => labels[col] || col);
    }
    return columns;
  }

  // --- Export as CSV (with labels) ---
  const handleDownloadCSV = useCallback((sheetIdx?: number, withLabels?: boolean) => {
    showToast('Preparing CSV download...');
    let sheet = typeof sheetIdx === 'number' ? sheets[sheetIdx] : sheets[activeSheet];
    if (!sheet) { showToast('CSV download failed'); return; }
    const columns = getAllColumns(sheet, withLabels, sheetIdx);
    let data = sheet.data;
    if (withLabels) {
      const labels = columnLabels[typeof sheetIdx === 'number' ? sheetIdx : activeSheet] || {};
      data = sheet.data.map(row => {
        const newRow: Record<string, any> = {};
        for (const col of sheet.columns) {
          newRow[labels[col] || col] = row[col];
        }
        return newRow;
      });
    }
    const csvRows = [columns.join(',')];
    for (const row of data) {
      const rowStr = columns.map(col => {
        const val = row[col] ?? '';
        return `"${String(val).replace(/"/g, '""')}"`;
      }).join(',');
      csvRows.push(rowStr);
    }
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sheet${typeof sheetIdx === 'number' ? `_${sheetIdx + 1}` : ''}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('CSV download finished!');
  }, [sheets, activeSheet, columnLabels, showToast]);

  // --- Export as JSON ---
  const handleDownloadJSON = useCallback((sheetIdx?: number) => {
    showToast('Preparing JSON download...');
    const sheet = typeof sheetIdx === 'number' ? sheets[sheetIdx] : sheets[activeSheet];
    if (!sheet) { showToast('JSON download failed'); return; }
    const blob = new Blob([JSON.stringify(sheet, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sheet${typeof sheetIdx === 'number' ? `_${sheetIdx + 1}` : ''}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('JSON download finished!');
  }, [sheets, activeSheet, showToast]);

  // --- Export as XLSX ---
  const handleDownloadXLSX = useCallback(async (sheetIdx?: number) => {
    showToast('Preparing XLSX download...');
    let sheet = typeof sheetIdx === 'number' ? sheets[sheetIdx] : sheets[activeSheet];
    if (!sheet) { showToast('XLSX download failed'); return; }
    const columns = getAllColumns(sheet, false, sheetIdx);
    const rows = [columns, ...sheet.data.map(row => columns.map(col => row[col] ?? ''))];
    const XLSX = await import('xlsx');
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sheet${typeof sheetIdx === 'number' ? `_${sheetIdx + 1}` : ''}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('XLSX download finished!');
  }, [sheets, activeSheet, showToast]);

  // --- Export as PDF (with labels and improved style) ---
  const handleDownloadPDF = useCallback(async (sheetIdx?: number, withLabels?: boolean) => {
    showToast('Preparing PDF download...');
    try {
      let sheet = typeof sheetIdx === 'number' ? sheets[sheetIdx] : sheets[activeSheet];
      if (!sheet) throw new Error('No sheet selected');
      const columns = getAllColumns(sheet, withLabels, sheetIdx);
      let data = sheet.data;
      if (withLabels) {
        const labels = columnLabels[typeof sheetIdx === 'number' ? sheetIdx : activeSheet] || {};
        data = sheet.data.map(row => {
          const newRow: Record<string, any> = {};
          for (const col of sheet.columns) {
            newRow[labels[col] || col] = row[col];
          }
          return newRow;
        });
      }
      const jsPDF = (await import('jspdf')).default;
      const autoTable = (await import('jspdf-autotable')).default;
      const doc = new jsPDF({ orientation: columns.length > 6 ? 'landscape' : 'portrait', unit: 'pt', format: 'a4' });
      autoTable(doc, {
        head: [columns],
        body: data.map(row => columns.map(col => row[col] ?? '')),
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [49, 46, 129], textColor: 255, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { top: 40, left: 16, right: 16 },
        tableWidth: 'auto',
      });
      doc.save(`sheet${typeof sheetIdx === 'number' ? `_${sheetIdx + 1}` : ''}.pdf`);
      showToast('PDF download finished!');
    } catch (e) {
      showToast('PDF download failed');
    }
  }, [sheets, activeSheet, columnLabels, showToast]);

  // --- Export with labels (columns with user edits) ---
  const getSheetWithLabels = useCallback((sheetIdx?: number) => {
    const sheet = typeof sheetIdx === 'number' ? sheets[sheetIdx] : sheets[activeSheet];
    if (!sheet) return null;
    const labels = columnLabels[typeof sheetIdx === 'number' ? sheetIdx : activeSheet] || {};
    const columns = sheet.columns.map(col => labels[col] || col);
    const data = sheet.data.map(row => {
      const newRow: Record<string, any> = {};
      for (const col of sheet.columns) {
        newRow[labels[col] || col] = row[col];
      }
      return newRow;
    });
    return { columns, data };
  }, [sheets, activeSheet, columnLabels]);

  // --- Expose all export/download handlers ---
  return {
    selectedFile, setSelectedFile,
    error, setError,
    submitStatus, setSubmitStatus,
    pdfPassword, setPdfPassword,
    showPasswordPrompt, setShowPasswordPrompt,
    pendingFile, setPendingFile,
    pdfSelected, setPdfSelected,
    columnEdits, setColumnEdits,
    uploadMutation,
    sheets, setSheets,
    mergedSheet, setMergedSheet,
    activeSheet, setActiveSheet,
    selectedForMerge, setSelectedForMerge,
    columnLabels, setColumnLabels,
    transposedView, setTransposedView,
    history, redoStack,
    pushHistory, handleUndo, handleRedo,
    handleFileChange, handleUpload, handlePasswordSubmit,
    handleMergeSheets,
    handleDeleteRow,
    handleDeleteColumn,
    handleDownloadCSV,
    handleDownloadJSON,
    handleDownloadXLSX,
    handleDownloadPDF,
    getSheetWithLabels,
  };
}
