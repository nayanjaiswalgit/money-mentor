import { useMemo } from 'react';
import { features } from '../config/features';

export const useFeatureFlag = (featureId: string) => {
  const feature = useMemo(() => features[featureId], [featureId]);

  if (!feature) {
    console.warn(`Feature flag "${featureId}" not found`);
    return false;
  }

  return feature.enabled;
};

export const useFeatureFlags = () => {
  return useMemo(() => features, []);
}; 