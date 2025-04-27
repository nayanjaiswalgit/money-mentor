import React, { useEffect, useState } from 'react';
import { Users, Plus, DollarSign } from 'lucide-react';
import { groupApi } from '../services/groupApi';

// Group type for TypeScript
interface Group {
  id: string;
  name: string;
  description?: string;
  members: string[];
  totalExpenses: number;
  yourShare: number;
  youOwe: number;
  youAreOwed: number;
}

export function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [memberEmails, setMemberEmails] = useState<string[]>(['']);

  // Fetch groups from API
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    groupApi.getGroups()
      .then((data) => {
        setGroups(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(() => {
        setError('Failed to load groups');
        setIsLoading(false);
      });
  }, []);

  // Handle group creation
  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      await groupApi.createGroup({
        name: newGroupName,
        description: newGroupDescription,
        members: memberEmails.filter(Boolean).map(email => ({ email })),
      });
      setShowModal(false);
      setNewGroupName('');
      setNewGroupDescription('');
      setMemberEmails(['']);
      const data = await groupApi.getGroups();
      setGroups(Array.isArray(data) ? data : []);
      setIsLoading(false);
    } catch (err: any) {
      setError('Failed to create group');
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Groups</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          <Plus size={20} className="mr-2" />
          Create Group
        </button>
      </div>

      {isLoading ? (
        <div className="text-gray-500">Loading groups...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : groups.length === 0 ? (
        <div className="text-gray-500">No groups found. Create your first group!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      {group?.members?.length} members
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Expenses</span>
                  <span className="font-medium">₹{group?.totalExpenses?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Your Share</span>
                  <span className="font-medium">₹{group?.yourShare?.toLocaleString()}</span>
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
        </div>
      )}

      {/* Modal for creating group */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form
            className="bg-white p-6 rounded-lg shadow-lg min-w-[320px]"
            onSubmit={handleCreateGroup}
          >
            <h2 className="text-lg font-semibold mb-4">Create a Group</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Group Name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              required
            />
            <textarea
              className="w-full p-2 border rounded mb-2"
              placeholder="Description (optional)"
              value={newGroupDescription}
              onChange={(e) => setNewGroupDescription(e.target.value)}
            />
            <div className="mb-4">
              <label className="block font-medium mb-1">Invite Members (by email)</label>
              {memberEmails.map((email, idx) => (
                <div key={idx} className="flex mb-1">
                  <input
                    type="email"
                    className="flex-1 p-2 border rounded mr-2"
                    placeholder="Email address"
                    value={email}
                    onChange={e => {
                      const copy = [...memberEmails];
                      copy[idx] = e.target.value;
                      setMemberEmails(copy);
                    }}
                  />
                  <button type="button" onClick={() => setMemberEmails(emails => emails.filter((_, i) => i !== idx))} className="text-red-600">Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => setMemberEmails(emails => [...emails, ''])} className="text-blue-600 mt-1">+ Add another</button>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded border"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}