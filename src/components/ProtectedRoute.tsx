import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  requiredFeature?: string;
}

export const ProtectedRoute = ({
  children,
  requiredRole,
  requiredFeature,
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole, hasFeature, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredFeature && !hasFeature(requiredFeature)) {
    return <Navigate to="/upgrade" replace />;
  }

  return <>{children}</>;
}; 