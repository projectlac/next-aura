import api from 'api/api';

const checkCall = (key, param) => {
  if (param) return `${key}=${param}`;
  else return '';
};


export const getListUser = (limit?: number) => {
  return api.get(`/user-manager?${checkCall('limit',limit)}`);
};
