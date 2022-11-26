import api from 'api/api';
import { getUser } from 'api/auth';
// import { getUser } from 'api/user';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const callUser = async () => {
      const token = Cookies.get('token');
      let user = null;
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await getUser()
          .then((res) => {
            user = res.data;
          })
          .catch(() => {
            router.push('/login');
          });

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
