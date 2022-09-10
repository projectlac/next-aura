import api from 'api/api';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

//api here is an axios instance which has the baseURL set according to the env.

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        console.log("Got a token in the cookies, let's see if it is valid");
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data: user } = await api.get('users/me');
        if (user) setUser(user);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string) => {
    const { data: token } = await api.post('auth/login', { email, password });
    if (token) {
      console.log('Got token');
      Cookies.set('token', token, { expires: 60 });
      api.defaults.headers.common['Authorization'] = `Bearer ${token.token}`;
      const { data: user } = await api.get('users/me');
      setUser(user);
      console.log('Got user', user);
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
