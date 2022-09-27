import RoutingToLink from '@/components/Common/RoutingToLogin/RoutingToLogin';
import { useEffect, useRef } from 'react';
import { useAuth } from './AuthGuard';

export const ProtectAdminContent = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const firstLoad = useRef(false);
  useEffect(() => {
    firstLoad.current = true;
  }, []);
  if (!isAuthenticated && firstLoad.current) {
    return <RoutingToLink href="/login" />;
  } else if (isAuthenticated && user.role !== 'USER' && firstLoad.current) {
    return <RoutingToLink href="/" />;
  } else {
    return children;
  }
};
