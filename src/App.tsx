import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { routes } from './config/routes.tsx';
import { useAuth } from './hooks/useAuth';
import LoadingSpinner from './components/LoadingSpinner';

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  const element = useRoutes(routes);
  return element;
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <AppRoutes />
        </Suspense>
      </Router>
    </Provider>
  );
}
