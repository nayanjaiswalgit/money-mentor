import { useState, useCallback } from 'react';

export interface SheetData {
  columns: string[];
  data: Record<string, any>[];
}

export function useSheetTable(initialSheets: SheetData[] = []) {
  const [sheets, setSheets] = useState<SheetData[]>(initialSheets);
  const [mergedSheet, setMergedSheet] = useState<SheetData | null>(null);
  const [activeSheet, setActiveSheet] = useState<number>(0);
  const [selectedForMerge, setSelectedForMerge] = useState<number[]>([]);
  const [columnLabels, setColumnLabels] = useState<{ [sheetIdx: number]: { [key: string]: string } }>({});
  const [transposedView, setTransposedView] = useState(false);
  const [history, setHistory] = useState<{sheets: SheetData[], mergedSheet: SheetData | null, activeSheet: number}[]>([]);
  const [redoStack, setRedoStack] = useState<{sheets: SheetData[], mergedSheet: SheetData | null, activeSheet: number}[]>([]);

  const pushHistory = useCallback(() => {
    setHistory(prev => [
      ...prev,
      {
        sheets: [...sheets],
        mergedSheet: mergedSheet ? { ...mergedSheet, columns: [...mergedSheet.columns], data: [...mergedSheet.data] } : null,
        activeSheet,
      },
    ]);
    setRedoStack([]);
  }, [sheets, mergedSheet, activeSheet]);

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setRedoStack(prev => [{ sheets: [...sheets], mergedSheet, activeSheet }, ...prev]);
    setSheets(last.sheets.map(s => ({ ...s, columns: [...s.columns], data: [...s.data] })));
    setMergedSheet(last.mergedSheet ? { ...last.mergedSheet, columns: [...last.mergedSheet.columns], data: [...last.mergedSheet.data] } : null);
    setActiveSheet(last.activeSheet);
    setHistory(prev => prev.slice(0, -1));
  }, [history, sheets, mergedSheet, activeSheet]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory(prev => [...prev, { sheets: [...sheets], mergedSheet, activeSheet }]);
    setSheets(next.sheets.map(s => ({ ...s, columns: [...s.columns], data: [...s.data] })));
    setMergedSheet(next.mergedSheet ? { ...next.mergedSheet, columns: [...next.mergedSheet.columns], data: [...next.mergedSheet.data] } : null);
    setActiveSheet(next.activeSheet);
    setRedoStack(prev => prev.slice(1));
  }, [redoStack, sheets, mergedSheet, activeSheet]);

  return {
    sheets, setSheets,
    mergedSheet, setMergedSheet,
    activeSheet, setActiveSheet,
    selectedForMerge, setSelectedForMerge,
    columnLabels, setColumnLabels,
    transposedView, setTransposedView,
    history, redoStack,
    pushHistory, handleUndo, handleRedo,
  };
}
