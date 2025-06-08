import { useAuth } from '../hooks/useAuth';

export const ExportPage = () => {
  const { hasFeature } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Export Data</h1>
      <div className="space-y-4">
        {hasFeature('export_pdf') && (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900">Export to PDF</h3>
            <p className="text-gray-500 mb-4">Export your data in PDF format</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Export PDF
            </button>
          </div>
        )}

        {hasFeature('export_excel') && (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900">Export to Excel</h3>
            <p className="text-gray-500 mb-4">Export your data in Excel format</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Export Excel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 