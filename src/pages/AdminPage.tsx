import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { featureService } from '../services/feature.service';
import { FeatureFlag } from '../types/auth';

export const AdminPage = () => {
  const { hasRole } = useAuth();
  const [features, setFeatures] = useState<FeatureFlag[]>(featureService.getAllFeatures());

  const toggleFeature = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    if (feature) {
      featureService.updateFeature(featureId, { enabled: !feature.enabled });
      setFeatures(featureService.getAllFeatures());
    }
  };

  if (!hasRole('admin')) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Feature Management</h2>
          <div className="space-y-4">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{feature.name}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={feature.enabled}
                      onChange={() => toggleFeature(feature.id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">User Management</h2>
          <div className="space-y-4">
            {/* Add user management interface here */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-900">User Roles</h3>
                <p className="text-sm text-gray-500">Manage user roles and permissions</p>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Manage Roles
              </button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Subscription Management</h2>
          <div className="space-y-4">
            {/* Add subscription management interface here */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Subscription Plans</h3>
                <p className="text-sm text-gray-500">Manage subscription plans and pricing</p>
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Manage Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 