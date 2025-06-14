import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="text-9xl font-bold text-indigo-600 dark:text-indigo-400">404</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Page Not Found</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="pt-6">
          <Button asChild>
            <Link to="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

