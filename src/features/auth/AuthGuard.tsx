
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectIsAuthenticated } from './authSlice';
import { ReactNode, useEffect, useState } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

// Type guard for location state
type LocationState = {
  from?: {
    pathname: string;
    search?: string;
    hash?: string;
    state?: unknown;
    key?: string;
  };
};

export function AuthGuard({ children, redirectTo = '/login' }: AuthGuardProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  // Add a small delay to prevent flash of content
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    // Preserve the current location in the state so we can redirect back to it after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export function PublicOnlyRoute({ children, redirectTo = '/' }: AuthGuardProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);

  // Add a small delay to prevent flash of content
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return null; // or a loading spinner
  }

  if (isAuthenticated) {
    // Get the redirect location from the state or use the default
    const from = (location.state as LocationState)?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}
