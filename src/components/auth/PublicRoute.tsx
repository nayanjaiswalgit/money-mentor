import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated, selectAuthInitialized } from '../../features/auth/authSlice';
import { Loader2 } from 'lucide-react';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  restricted?: boolean;
}

export const PublicRoute = ({
  children,
  redirectTo = '/',
  restricted = true,
}: PublicRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectAuthInitialized);
  const [isLoading, setIsLoading] = useState(true);

  // Show loading state while checking auth status
  useEffect(() => {
    // If auth check is complete, update loading state
    if (isInitialized) {
      setIsLoading(false);
    }
  }, [isInitialized]);

  // Show loading indicator while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If restricted is true and user is authenticated, redirect to home/dashboard
  if (restricted && isAuthenticated) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  // Otherwise, render the children
  return <>{children}</>;
};

export default PublicRoute;
