import RoutingToLink from '@/components/Common/RoutingToLogin/RoutingToLogin';
import { useLayoutEffect, useRef, useState } from 'react';
import { useAuth } from './AuthGuard';

export const ProtectGuess = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const firstLoad = useRef(false);
  const [check, setCheck] = useState(false);
  useLayoutEffect(() => {
    firstLoad.current = true;
    if (firstLoad.current) {
      setCheck(true);
    }
  }, []);

  if (!isAuthenticated && check) {
    return <RoutingToLink href="/login" />;
  }
  return children;
};
