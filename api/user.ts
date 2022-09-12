import api from './api';

export const getUser = () => {
  return api.get('/auth/profile');
};
