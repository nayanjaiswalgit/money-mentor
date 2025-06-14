import React from 'react';

const NotAuthorizedPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-3xl font-bold text-red-600 mb-4">403 - Not Authorized</h1>
    <p className="text-lg text-gray-700 mb-6">You do not have permission to view this page.</p>
    <a href="/" className="text-indigo-600 hover:underline">Go to Home</a>
  </div>
);

export default NotAuthorizedPage; 