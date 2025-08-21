import React, { lazy } from 'react';

const LandingPage = lazy(() => import('../pages/LandingPage').then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const Dashboard = lazy(() => import('../pages/Dashboard').then(m => ({ default: m.Dashboard })));
const TransactionsPage = lazy(() => import('../pages/TransactionsPage').then(m => ({ default: m.TransactionsPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const AccountsPage = lazy(() => import('../pages/AccountsPage').then(m => ({ default: m.AccountsPage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then(m => ({ default: m.SettingsPage })));
const ReportsPage = lazy(() => import('../pages/ReportsPage').then(m => ({ default: m.ReportsPage })));
const SheetUploadPage = lazy(() => import('../pages/SheetUploadPage'));
const MonthlySummaryPage = lazy(() => import('../pages/MonthlySummaryPage').then(m => ({ default: m.MonthlySummaryPage })));

export type RouteType = 'public' | 'protected';

export interface AppRouteConfig {
    path: string;
    element: React.ReactElement;
    type: RouteType;
    requiredRole?: string;
    requiredGroup?: string;
    requiredFeature?: string;
}

export const allRoutes: AppRouteConfig[] = [
    { path: '/', element: <LandingPage />, type: 'public' },
    { path: '/login', element: <LoginPage />, type: 'public' },
    { path: '/register', element: <RegisterPage />, type: 'public' },
    { path: '/dashboard', element: <Dashboard />, type: 'protected' },
    { path: '/transactions', element: <TransactionsPage />, type: 'protected', requiredRole: 'user' },
    { path: '/accounts', element: <AccountsPage />, type: 'protected', requiredRole: 'user' },
    { path: '/settings', element: <SettingsPage />, type: 'protected', requiredRole: 'admin' },
    { path: '/reports', element: <ReportsPage />, type: 'protected', requiredRole: 'user', requiredFeature: 'advanced_analytics' },
    { path: '/upload', element: <SheetUploadPage />, type: 'protected', requiredRole: 'user', requiredGroup: 'finance' },
    { path: '/monthly-summary', element: <MonthlySummaryPage />, type: 'protected', requiredRole: 'user', requiredFeature: 'export_pdf' },
    { path: '*', element: <NotFoundPage />, type: 'public' },
]; 