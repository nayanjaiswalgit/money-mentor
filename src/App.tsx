import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { allRoutes, AppRouteConfig } from './routes/allRoutes';
import { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <Router>  
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {allRoutes.map((route: AppRouteConfig) =>
              route.type === 'protected' ? (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <ProtectedRoute
                      requiredRole={route.requiredRole}
                      requiredGroup={route.requiredGroup}
                      requiredFeature={route.requiredFeature}
                    >
                      {route.element}
                    </ProtectedRoute>
                  }
                />
              ) : (
                <Route key={route.path} path={route.path} element={route.element} />
              )
            )}
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
