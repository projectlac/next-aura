import apiFormData from 'api/formData/apiFormData';
import { IAccountVip } from 'model/form';

const checkCall = (param) => {
  console.log(param);

  if (param) return `&${[param]}=${param}`;
  else return '';
};

export const createAccountVip = (data: FormData) => {
  return apiFormData.post('/account/create-account-vip', data);
};
export const getAccountVip = (param: IAccountVip) => {
  return apiFormData.get(
    `/account?type=VIP&limit=${param.limit}&offset=${param.offset}&priceSort=${
      param.priceSort
    }${checkCall(param.hero)}${checkCall(param.server)}${checkCall(
      param.weapon
    )}`
  );
};
