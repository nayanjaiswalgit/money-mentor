import { useAuth } from '../hooks/useAuth';

export const Dashboard = () => {
  const { user, hasFeature } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Basic Stats */}
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-indigo-900">Welcome, {user?.name}</h3>
          <p className="text-indigo-700">Your subscription: {user?.subscription.plan}</p>
        </div>

        {/* Feature Cards */}
        {hasFeature('export_pdf') && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-green-900">Export Available</h3>
            <p className="text-green-700">You can export your data to PDF</p>
          </div>
        )}

        {hasFeature('advanced_analytics') && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-purple-900">Advanced Analytics</h3>
            <p className="text-purple-700">Access to advanced analytics features</p>
          </div>
        )}

        {hasFeature('team_collaboration') && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-blue-900">Team Collaboration</h3>
            <p className="text-blue-700">Access to team collaboration features</p>
          </div>
        )}
      </div>
    </div>
  );
}; 