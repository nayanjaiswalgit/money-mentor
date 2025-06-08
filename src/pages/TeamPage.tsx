import { useAuth } from '../hooks/useAuth';

export const TeamPage = () => {
  const { hasFeature } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Team Collaboration</h1>
      <div className="space-y-6">
        {hasFeature('team_collaboration') && (
          <>
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
              <div className="mt-4 space-y-2">
                {/* Add team member list here */}
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    J
                  </div>
                  <span>John Doe</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                    J
                  </div>
                  <span>Jane Smith</span>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">Shared Expenses</h3>
              <div className="mt-4">
                {/* Add shared expenses list here */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Office Supplies</span>
                    <span className="text-green-600">$150.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Team Lunch</span>
                    <span className="text-green-600">$75.00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900">Team Reports</h3>
              <div className="mt-4">
                {/* Add team reports here */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Monthly Team Expense Report</span>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      View
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Team Budget Overview</span>
                    <button className="text-indigo-600 hover:text-indigo-800">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 