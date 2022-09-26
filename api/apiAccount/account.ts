import api from 'api/api';
import apiFormData from 'api/formData/apiFormData';
import { IAccountVip, IQueryRandomAcc, IQueryVipAcc } from 'model/form';

const checkCall = (key, param) => {
  if (param) return `&${key}=${param}`;
  else return '';
};

export const createAccountVip = (data: FormData) => {
  return apiFormData.post('/account/create-account-vip', data);
};
export const getAccountVipFromDashboard = (param: IAccountVip) => {
  return apiFormData.get(
    `/account/get-accounts-by-admin?type=VIP&limit=${param.limit}&offset=${
      param.offset
    }&priceSort=${param.priceSort}${checkCall('hero', param.hero)}${checkCall(
      'server',
      param.server
    )}${checkCall('weapon', param.weapon)}`
  );
};
export const getAccountBySlug = (slug: string) => {
  return apiFormData.get(`/account/${slug}`);
};
export const editAccountVip = (slug: string, formData: FormData) => {
  return apiFormData.put(`account/update-account-vip/${slug}`, formData);
};
export const deleteAccount = (slug: string) => {
  return apiFormData.delete(`account/delete/${slug}`);
};

export const createAccountNomal = (data: FormData) => {
  return apiFormData.post('/account/create-account', data);
};

export const getAccountNomalFromDashboard = (limit: number) => {
  return apiFormData.get(
    `/account/get-accounts-by-admin?type=REROLL,RANDOM&limit=${limit}&offset=0`
  );
};

export const queryRandomAccount = (param: IQueryRandomAcc) => {
  return apiFormData.get(
    `/account/get-accounts?type=RANDOM&limit=${param.limit}&offset=${
      param.offset
    }&priceSort=${param.priceSort}${checkCall(
      'keyword',
      param.keyword
    )}${checkCall('ar', param.ar)}${checkCall('rangeMoney', param.rangeMoney)}`
  );
};
export const queryRerollAccount = (param: IQueryRandomAcc) => {
  return apiFormData.get(
    `/account/get-accounts?type=REROLL&limit=${param.limit}&offset=${
      param.offset
    }&priceSort=${param.priceSort}${checkCall(
      'keyword',
      param.keyword
    )}${checkCall('ar', param.ar)}${checkCall('rangeMoney', param.rangeMoney)}`
  );
};
export const queryAccountVip = (param: IQueryVipAcc) => {
  return apiFormData.get(
    `/account/get-accounts?type=VIP&limit=${param.limit}&offset=${
      param.offset
    }&priceSort=${param.priceSort}${checkCall(
      'code',
      param.keyword
    )}${checkCall('ar', param.ar)}${checkCall(
      'server',
      param.server
    )}${checkCall('hero', param.hero)}${checkCall(
      'weapon',
      param.weapon
    )}${checkCall('rangeMoney', param.rangeMoney)}`
  );
};

export const buyAccount = (slug: string) => {
  return api.post(`/buy-account`, { slugs: [slug] });
};
