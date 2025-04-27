import React from 'react';
import { Users, Plus, DollarSign } from 'lucide-react';

// interface Group {
//   id: string;
//   name: string;
//   members: string[];
//   totalExpenses: number;
//   yourShare: number;
//   youOwe: number;
//   youAreOwed: number;
// }

// const groups: Group[] = [];

export function GroupsPage() {
  // const { data: groups = [], isLoading, error } = useGroups();

  // if (isLoading) return <div className="p-4">Loading groups...</div>;
  // if (error) return <div className="p-4 text-red-600">Failed to load groups.</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Create Group
        </button>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500">
                    {group.members.length} members
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Expenses</span>
                <span className="font-medium">₹{group.totalExpenses.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Your Share</span>
                <span className="font-medium">₹{group.yourShare.toLocaleString()}</span>
              </div>
              {group.youOwe > 0 && (
                <div className="flex justify-between text-sm text-red-600">
                  <span>You owe</span>
                  <span className="font-medium">₹{group.youOwe.toLocaleString()}</span>
                </div>
              )}
              {group.youAreOwed > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>You are owed</span>
                  <span className="font-medium">₹{group.youAreOwed.toLocaleString()}</span>
                </div>
              )}
            </div>

            <button className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <DollarSign size={20} className="mr-2 text-gray-500" />
              Add Expense
            </button>
          </div>
        ))}
      </div> */}
      <div className="text-gray-500">Connect to API for groups data.</div>
    </div>
  );
}