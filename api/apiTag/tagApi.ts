import api from 'api/api';

const checkCall = (key, param) => {
  if (param) return `${key}=${param}`;
  else return '';
};

export const getWeapon = (limit?: number) => {
  return api.get(`/weapon?${checkCall('limit', limit)}`);
};

export const getHero = (limit?: number) => {
  return api.get(`/hero?${checkCall('limit', limit)}`);
};
export const createWeapon = (data: FormData) => {
  return api.post(`/weapon/create`, data);
};

export const createHero = (data: FormData) => {
  return api.post(`/hero/create`, data);
};

export const editWeapon = (slug: string, data: FormData) => {
  return api.put(`/weapon/update/${slug}`, data);
};

export const editHero = (slug: string, data: FormData) => {
  return api.put(`/hero/update/${slug}`, data);
};

export const getWeaponBySlug = (slug: string) => {
  return api.get(`/weapon/${slug}`);
};

export const getHeroBySlug = (slug: string) => {
  return api.get(`/hero/${slug}`);
};
export const deleteWeapon = (slug: string) => {
  return api.patch(`/weapon/delete/${slug}`);
};

export const deleteHero = (slug: string) => {
  return api.patch(`/hero/delete/${slug}`);
};
