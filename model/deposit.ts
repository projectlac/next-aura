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
