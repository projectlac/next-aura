import RoutingToLink from '@/components/Common/RoutingToLogin/RoutingToLogin';
import api from 'api/api';
import { getUser } from 'api/user';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const ProtectGuess = ({ children }) => {
  const token = Cookies.get('token');
  const router = useRouter();
  useEffect(() => {
    const callUser = async () => {
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data: user } = await getUser();

        if (!user) {
          return <RoutingToLink href="/login" />;
        }
      } else {
        router.push('/login');
      }
    };
    callUser();
  }, []);

  return children;
};
