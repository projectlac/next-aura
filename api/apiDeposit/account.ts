import api from 'api/api';
import { IDepositCreate } from 'model/deposit';

// get total
export const createDeposit = (param: IDepositCreate) => {
  return api.post('/deposit/create', param);
};

export const getDeposit = () => {
  return api.get('/deposit/');
};
