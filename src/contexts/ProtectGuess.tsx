import RoutingToLink from '@/components/Common/RoutingToLogin/RoutingToLogin';
import { useEffect, useRef } from 'react';
import { useAuth } from './AuthGuard';

export const ProtectGuess = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const firstLoad = useRef(false);
  useEffect(() => {
    firstLoad.current = true;
  }, []);
  if (!isAuthenticated && firstLoad.current) {
    return <RoutingToLink href="/login" />;
  }
  return children;
};
