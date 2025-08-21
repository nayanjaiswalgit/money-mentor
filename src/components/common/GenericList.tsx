import React from 'react';
import { useSearchFilterPagination } from '../../hooks/useSearchFilterPagination';

export interface GenericListConfig<F = Record<string, any>, T = any> {
  fetchData: (params: {
    search: string;
    filters: F;
    page: number;
    pageSize: number;
  }) => Promise<{ data: T[]; total: number }>;
  fields: { key: keyof T; label: string }[];
  filterFields?: { key: keyof F; label: string; type?: 'text' | 'select'; options?: { value: any; label: string }[] }[];
  initialFilters?: F;
  initialPageSize?: number;
  searchPlaceholder?: string;
  title?: string;
}

export function GenericList<F = Record<string, any>, T = any>({ config }: { config: GenericListConfig<F, T> }) {
  const {
    fetchData,
    fields,
    filterFields = [],
    initialFilters = {} as F,
    initialPageSize = 10,
    searchPlaceholder = 'Search...',
    title,
  } = config;

  const {
    search,
    setSearch,
    filters,
    setFilters,
    page,
    setPage,
    pageSize,
    setPageSize,
    data,
    total,
    loading,
    error,
  } = useSearchFilterPagination<F, T>({
    fetchData,
    initialFilters,
    initialPageSize,
  });

  return (
    <div className="bg-white rounded shadow p-4">
      {title && <h2 className="text-lg font-bold mb-2">{title}</h2>}
      <div className="flex flex-wrap gap-2 mb-4 items-end">
        <input
          className="border rounded px-2 py-1"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
        />
        {filterFields.map(f => (
          <div key={String(f.key)}>
            <label className="block text-xs mb-1">{f.label}</label>
            {f.type === 'select' && f.options ? (
              <select
                className="border rounded px-2 py-1"
                value={String(filters[f.key] ?? '')}
                onChange={e => setFilters({ [f.key]: e.target.value } as Partial<F>)}
              >
                <option value="">All</option>
                {f.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                className="border rounded px-2 py-1"
                type="text"
                value={String(filters[f.key] ?? '')}
                onChange={e => setFilters({ [f.key]: e.target.value } as Partial<F>)}
              />
            )}
          </div>
        ))}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <>
          <table className="w-full mb-2">
            <thead>
              <tr>
                {fields.map(f => (
                  <th key={String(f.key)} className="text-left px-2 py-1 border-b">{f.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={fields.length} className="text-center py-4">No data</td></tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    {fields.map(f => (
                      <td key={String(f.key)} className="px-2 py-1 border-b">{String(item[f.key] ?? '')}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex items-center gap-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-2 py-1 border rounded">Prev</button>
            <span>Page {page}</span>
            <button disabled={data.length < pageSize} onClick={() => setPage(page + 1)} className="px-2 py-1 border rounded">Next</button>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))} className="border rounded px-2 py-1">
              {[5, 10, 20, 50].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span>Total: {total}</span>
          </div>
        </>
      )}
    </div>
  );
} 