import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logoutUser } from '../../features/auth/authSlice';

export function LogoutPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await dispatch(logoutUser()).unwrap();
        // Redirect to login page after successful logout
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Logout error:', error);
        // Even if there's an error, redirect to login
        navigate('/login', { replace: true });
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-700">Signing out...</p>
      </div>
    </div>
  );
}

export default LogoutPage;
