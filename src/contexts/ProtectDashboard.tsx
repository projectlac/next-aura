import api from 'api/api';
import { getUser } from 'api/user';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const callUser = async () => {
      const token = Cookies.get('token');

      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data: user } = await getUser();

        if (!user) {
          router.push('/login');
        }
        if (user && user.role === 'USER') {
          router.push('/');
        }
      } else {
        router.push('/login');
      }
    };
    callUser();
  }, []);

  return children;
};
