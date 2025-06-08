import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { MainLayout } from './components/layout/MainLayout';
import { ThemeProvider } from './providers/ThemeProvider';
import { routes } from './config/routes';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Routes>
            {routes.map(({ path, element: Element, isPublic, requiredFeature, requiredRole }) => (
              <Route
                key={path}
                path={path}
                element={
                  isPublic ? (
                    <Element />
                  ) : (
                    <ProtectedRoute requiredFeature={requiredFeature} requiredRole={requiredRole}>
                      <Element />
                    </ProtectedRoute>
                  )
                }
              />
            ))}
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
