import RoutingToLink from '@/components/Common/RoutingToLogin/RoutingToLogin';
import api from 'api/api';
import { getUser } from 'api/user';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export const ProtectGuess = ({ children }) => {
  const token = Cookies.get('token');

  useEffect(() => {
    const callUser = async () => {
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data: user } = await getUser();

        if (!user) {
          return <RoutingToLink href="/login" />;
        }
      }
    };
    callUser();
  }, []);

  return children;
};
