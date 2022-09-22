import api from 'api/api';

const checkCall = (param) => {
  if (param) return `${[param]}=${param}`;
  else return '';
};
export const getServer = (limit?: number) => {
  return api.get(`/server?${checkCall(limit)}`);
};

export const getWeapon = (limit?: number) => {
  return api.get(`/weapon?${checkCall(limit)}`);
};

export const getHero = (limit?: number) => {
  return api.get(`/hero?${checkCall(limit)}`);
};
