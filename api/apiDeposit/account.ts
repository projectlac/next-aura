import api from 'api/api';
import { IDepositCreate } from 'model/deposit';

// get total
export const createDeposit = (param: IDepositCreate) => {
  return api.post('/deposit/create', param);
};

export const getDeposit = () => {
  return api.get('/deposit?limit=9999');
};

export const changeStatusDeposit = (id: number, status: string) => {
  return api.patch(`/deposit/update-status-transaction/${id}`, {
    transaction_status: status
  });
};

export const getTop10 = () => {
  return api.get('/history/latest-top-up');
};
