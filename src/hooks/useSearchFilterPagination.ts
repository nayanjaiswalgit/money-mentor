import { useState, useEffect, useCallback } from 'react';

export interface UseSearchFilterPaginationProps<F = Record<string, any>, T = any> {
  fetchData: (params: {
    search: string;
    filters: F;
    page: number;
    pageSize: number;
  }) => Promise<{ data: T[]; total: number }>;
  initialSearch?: string;
  initialFilters?: F;
  initialPage?: number;
  initialPageSize?: number;
  debounceMs?: number;
}

export function useSearchFilterPagination<F = Record<string, any>, T = any>({
  fetchData,
  initialSearch = '',
  initialFilters = {} as F,
  initialPage = 1,
  initialPageSize = 10,
  debounceMs = 400,
}: UseSearchFilterPaginationProps<F, T>) {
  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState<F>(initialFilters);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), debounceMs);
    return () => clearTimeout(handler);
  }, [search, debounceMs]);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchData({
        search: debouncedSearch,
        filters,
        page,
        pageSize,
      });
      setData(result.data);
      setTotal(result.total);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [fetchData, debouncedSearch, filters, page, pageSize]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page on search
  };
  const handleFilterChange = (newFilters: Partial<F>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1); // Reset to first page on filter
  };
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page on page size change
  };

  return {
    search,
    setSearch: handleSearchChange,
    filters,
    setFilters: handleFilterChange,
    page,
    setPage: handlePageChange,
    pageSize,
    setPageSize: handlePageSizeChange,
    data,
    total,
    loading,
    error,
    refresh: fetch,
  };
} 