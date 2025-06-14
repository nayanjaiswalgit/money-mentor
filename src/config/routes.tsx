import React from 'react';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import PublicLayout from '../layouts/PublicLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

// Lazy load pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage').then(module => ({ default: module.default })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then(module => ({ default: module.default })));
const DashboardPage = lazy(() => import('../pages/DashboardPage').then(module => ({ default: module.default })));
const AccountsPage = lazy(() => import('../pages/AccountsPage').then(module => ({ default: module.AccountsPage })));
const TransactionsPage = lazy(() => import('../pages/TransactionsPage').then(module => ({ default: module.TransactionsPage })));
const ReportsPage = lazy(() => import('../pages/ReportsPage').then(module => ({ default: module.ReportsPage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const GroupDetailsPageWrapper = lazy(() => import('../pages/GroupDetailsPageWrapper').then(module => ({ default: module.default })));
const LandingPage = lazy(() => import('../pages/LandingPage').then(module => ({ default: module.LandingPage })));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'accounts',
        element: <AccountsPage />,
      },
      {
        path: 'transactions',
        element: <TransactionsPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'groups/:id',
        element: <GroupDetailsPageWrapper />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]; 