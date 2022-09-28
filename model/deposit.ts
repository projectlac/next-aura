export interface IDepositCreate {
  uuid: string;
  username: string;
  password: string;
  server: string;
  name: string;
  phone: string;
  pack: number;
  note?: string;
}
export type IStatus = 'PEDDING' | 'SUCCESS' | 'ERROR';
export interface IGetDeposit {
  id: number;
  uuid: string;
  username: string;
  password: string;
  server: string;
  name: string;
  phone: string;
  pack: number;
  note?: string;
  status: IStatus;
  created_at: string;
}
