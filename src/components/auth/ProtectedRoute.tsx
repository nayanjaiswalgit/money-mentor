import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useGetUserProfileQuery } from '../../app/api/userApi';

export function ProtectedRoute() {
  const { data: user, isLoading } = useGetUserProfileQuery({});
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}