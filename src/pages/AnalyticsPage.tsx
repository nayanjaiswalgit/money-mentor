import { useAuth } from '../hooks/useAuth';

export const AnalyticsPage = () => {
  const { hasFeature } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Advanced Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hasFeature('advanced_analytics') && (
          <>
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">Expense Trends</h3>
              <p className="text-gray-500">View your expense trends over time</p>
              {/* Add your analytics charts here */}
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">Category Analysis</h3>
              <p className="text-gray-500">Analyze your spending by category</p>
              {/* Add your category analysis charts here */}
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">Budget vs Actual</h3>
              <p className="text-gray-500">Compare your budget with actual spending</p>
              {/* Add your budget comparison charts here */}
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">Forecasting</h3>
              <p className="text-gray-500">View spending forecasts and predictions</p>
              {/* Add your forecasting charts here */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 