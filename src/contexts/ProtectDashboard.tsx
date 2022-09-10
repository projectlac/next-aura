import RoutingToLink from '@/components/Common/RoutingToLogin/RoutingToLogin';
import { useRouter } from 'next/router';
import { useAuth } from './AuthGuard';

export const ProtectRoute = ({ children }) => {
  const route = useRouter();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated && route.pathname !== '/login') {
    return <RoutingToLink href="/login" />;
  }
  if (isAuthenticated && user.role !== 'USER') {
    return <RoutingToLink href="/" />;
  }
  return children;
};
