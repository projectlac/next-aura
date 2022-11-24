import CustomizedSnackbars from '@/components/Common/SnackBar/SnackBar';
import api from 'api/api';
// import { signIn, signUp } from 'api/auth';
// import apiFormData from 'api/formData/apiFormData';
// import { getUser } from 'api/user';
import Cookies from 'js-cookie';
import { ISnackBar } from 'model/snackbar';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

//api here is an axios instance which has the baseURL set according to the env.

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [update, setUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<ISnackBar>(null);
  const router = useRouter();
  const updateSuccess = () => {
    setUpdate(!update);
  };
  const handleSetMessage = (message: ISnackBar) => {
    setMessage(message);
  };

  useEffect(() => {
    const loadUserFromCookies = async () => {
      const token = Cookies.get('token');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // apiFormData.defaults.headers.common[
        //   'Authorization'
        // ] = `Bearer ${token}`;

        // const { data: user } = await getUser();

        if (user) setUser(user);
      }
      setLoading(false);
      updateSuccess();
    };
    loadUserFromCookies();
  }, []);

  const login = async (username: string, password: string) => {
    let token = '';
    try {
      // await signIn({ username, password }).then((res) => (token = res.data));
    } catch (error) {
      handleSetMessage({
        type: 'error',
        message: error.response.data?.message
      });
    }

    if (token) {
      Cookies.set('token', token, { expires: 60 });
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // apiFormData.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // const { data: user } = await getUser();
      localStorage.setItem('numberOfFate', user.id);
      setUser(user);
      router.push('/');
    }
  };

  const register = async (
    username: string,
    password: string,
    email: string
  ) => {
    let token = '';
    try {
      // await signUp({
      //   username,
      //   password,
      //   email,
      //   confirmPassword: password
      // }).then((res) => {
      //   token = res.data;
      //   handleSetMessage({ type: 'success', message: 'Đăng ký thành công' });
      // });
    } catch (error) {
      handleSetMessage({ type: 'error', message: error.response.data.message });
    }

    if (token) {
      Cookies.set('token', token, { expires: 60 });
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // apiFormData.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // const { data: user } = await getUser();
      setUser(user);
      router.push('/');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    // delete apiFormData.defaults.headers.common['Authorization'];
    localStorage.removeItem('indexNewsestID');
    localStorage.removeItem('lastestNotify');

    window.location.pathname = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        loading,
        logout,
        handleSetMessage,
        register,
        updateSuccess,
        update
      }}
    >
      <CustomizedSnackbars message={message} />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
