
export type IRole = 'ADMIN' | 'MOD' | 'USER';

export interface IUser{
  id: number;
  email: string;
  username:string;
  role: IRole;
  money:string;
}

export interface IRoleData{
  role:string, bonus?:number
}