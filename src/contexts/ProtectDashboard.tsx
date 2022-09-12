import RoutingToLink from '@/components/Common/RoutingToLogin/RoutingToLogin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './AuthGuard';

export const ProtectRoute = ({ children }) => {
  const route = useRouter();

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const check = () => {
      if (!isAuthenticated && route.pathname !== '/login') {
        return <RoutingToLink href="/login" />;
      }
      if (isAuthenticated && user.role === 'USER') {
        return <RoutingToLink href="/" />;
      }
    };
    check();
  }, [route.pathname]);
  return children;
};
