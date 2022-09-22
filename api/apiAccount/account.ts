import apiFormData from 'api/formData/apiFormData';

export const createAccountVip = (data: FormData) => {
  return apiFormData.post('/account/create-account-vip', data);
};
