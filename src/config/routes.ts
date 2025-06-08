import { Dashboard } from '../pages/Dashboard';
import { ExportPage } from '../pages/ExportPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { TeamPage } from '../pages/TeamPage';
import { AdminPage } from '../pages/AdminPage';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import { SubscriptionPlans } from '../components/subscription/SubscriptionPlans';

export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  isPublic?: boolean;
  requiredFeature?: string;
  requiredRole?: string;
}

export const routes: RouteConfig[] = [
  {
    path: '/login',
    element: LoginForm,
    isPublic: true,
  },
  {
    path: '/register',
    element: RegisterForm,
    isPublic: true,
  },
  {
    path: '/',
    element: Dashboard,
  },
  {
    path: '/export',
    element: ExportPage,
    requiredFeature: 'export_pdf',
  },
  {
    path: '/analytics',
    element: AnalyticsPage,
    requiredFeature: 'advanced_analytics',
  },
  {
    path: '/team',
    element: TeamPage,
    requiredFeature: 'team_collaboration',
  },
  {
    path: '/admin',
    element: AdminPage,
    requiredRole: 'admin',
  },
  {
    path: '/subscription',
    element: SubscriptionPlans,
  },
]; 