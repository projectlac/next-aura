import apiFormData from 'api/formData/apiFormData';
import { IAccountVip } from 'model/form';

const checkCall = (param) => {


  if (param) return `&${[param]}=${param}`;
  else return '';
};

export const createAccountVip = (data: FormData) => {
  return apiFormData.post('/account/create-account-vip', data);
};
export const getAccountVipFromDashboard = (param: IAccountVip) => {
  return apiFormData.get(
    `/account/get-accounts-by-admin?type=VIP&limit=${param.limit}&offset=${param.offset}&priceSort=${
      param.priceSort
    }${checkCall(param.hero)}${checkCall(param.server)}${checkCall(
      param.weapon
    )}`
  );
};
export const getAccountBySlug=(slug:string) =>{
  return apiFormData.get(`/account/${slug}` );
}
export const editAccountVip=(slug:string, formData:FormData) =>{
  return apiFormData.put(`account/update-account-vip/${slug}`,formData)
}
export const deleteAccount = (slug:string) =>{
  return apiFormData.delete(`account/delete/${slug}`)

}