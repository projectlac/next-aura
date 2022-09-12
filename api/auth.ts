import { ILogin } from 'model/form';
import api from './api';

export const signIn = (data: ILogin) => {
  return api.post('/auth/login', data);
};
