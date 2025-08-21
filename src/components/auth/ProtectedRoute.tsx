import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFeatureFlag } from '../../hooks/useFeatureFlag';
import { selectAuthUser, selectAuthLoading } from '../../features/auth/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  requiredGroup?: string;
  requiredFeature?: string;
}

export function ProtectedRoute({ children, requiredRole, requiredGroup, requiredFeature }: ProtectedRouteProps) {
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectAuthLoading);
  const location = useLocation();
  const hasFeature = requiredFeature ? useFeatureFlag(requiredFeature) : true;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredGroup && (!('groups' in user) || !Array.isArray((user as any).groups) || !(user as any).groups.includes(requiredGroup))) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredFeature && !hasFeature) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}