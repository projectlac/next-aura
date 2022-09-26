export type IRole = 'ADMIN' | 'MOD' | 'USER';

export interface IUser {
  id: number;
  email: string;
  username: string;
  role: IRole;
  money: string;
  bonus?: number;
  account_type?: string;
}

export interface IRoleData {
  role: string;
  bonus?: number;
  account_type?: string;
}
