import { ComponentType, LazyExoticComponent } from 'react';

export interface RouteConfig {
  path: string;
  element: ComponentType | LazyExoticComponent<any>;
  children?: RouteConfig[];
  isPublic?: boolean;
  requiredRole?: string;
  requiredFeature?: string;
  requiredGroup?: string;
} 