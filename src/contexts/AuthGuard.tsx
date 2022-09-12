import api from 'api/api';
import { signIn } from 'api/auth';
import { getUser } from 'api/user';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

//api here is an axios instance which has the baseURL set according to the env.

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();
  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data: user } = await getUser();
        if (user) setUser(user);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (username: string, password: string) => {
    const { data: token } = await signIn({ username, password });

    if (token) {
      Cookies.set('token', token, { expires: 60 });
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const { data: user } = await getUser();
      setUser(user);
      router.push('/');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    window.location.pathname = '/login';
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
