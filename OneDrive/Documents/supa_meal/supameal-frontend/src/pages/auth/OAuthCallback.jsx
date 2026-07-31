import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../../components/Loader/Loader';

const DASHBOARD_ROUTES = {
  customer: '/customer/dashboard',
  owner: '/owner/dashboard',
  restaurant_owner: '/owner/dashboard',
  admin: '/admin/dashboard',
};

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { persistAuth } = useAuth();

  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const userParam = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      navigate(`/login?error=${encodeURIComponent(error)}`, { replace: true });
      return;
    }

    if (accessToken && userParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        persistAuth(user, accessToken, refreshToken);
        const roleKey = user.role === 'owner' ? 'restaurant_owner' : user.role;
        navigate(DASHBOARD_ROUTES[roleKey] || DASHBOARD_ROUTES.customer, { replace: true });
      } catch {
        navigate('/login?error=Invalid+OAuth+response', { replace: true });
      }
    } else {
      navigate('/login?error=OAuth+failed', { replace: true });
    }
  }, [searchParams, navigate, persistAuth]);

  return <Loader text="Completing sign-in..." />;
}
