import api from 'api/api';

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
        // await getUser().catch(() => {
        //   router.push('/login');
        // });
      } else {
        router.push('/login');
      }
    };
    callUser();
  }, [router.asPath]);

  return children;
};
