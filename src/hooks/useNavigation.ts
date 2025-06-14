import { useMemo } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { isFeatureEnabled, hasRole } from '../lib/utils';

export const useNavigation = () => {
  const user = useAppSelector(selectCurrentUser);

  const checkFeature = useMemo(
    () => (feature: string) => 
      isFeatureEnabled(user?.features, feature),
    [user?.features]
  );

  const checkRole = useMemo(
    () => (role: string) => 
      hasRole(user?.role, role),
    [user?.role]
  );

  return {
    user,
    hasFeature: checkFeature,
    hasRole: checkRole,
    isAuthenticated: !!user,
  };
};
