import React from 'react';

export interface IFormatForm {
  formik: any;
  children: React.ReactNode;
}
export interface ITextField {
  formik: any;
  type: string;
  name: string;
  label: string;
  sx?: any;
  options?: ISelectOption[];
}
export interface InputObj {
  name: string;
  type: string;
  mode: string;
  label: string;
  options?: ISelectOption[];
}
export interface ISelectOption {
  value: string;
  title: string;
}
export interface ILogin {
  username: string;
  password: string;
}
export interface IRegis extends ILogin {
  confirmPassword: string;
  email: string;
}
export interface IResetPassword {
  password: string;
  confirmPassword: string;
  token: string;
}
// ADD ACCOUNT VIP
// export interface IAccountVip {
//   username: string;
//   password: string;
//   name: string;
//   price: number;
//   description: string;
//   hero: string;
//   weapon: string;
//   server: string;
//   ar_level: string;
// }

///GetAcount
export interface IAccountVip {
  limit: number;
  offset: number;
  priceSort: boolean | '';
  server?: string;
  hero?: string;
  weapon?: string;
  keyword?:string;
  is_sold?:boolean|null;
}

export interface IQueryRandomAcc {
  limit: number;
  offset: number;
  priceSort: boolean | '';
  ar: string;
  keyword: string;
  rangeMoney?: string;
}

export interface IQueryVipAcc {
  limit: number;
  offset: number;
  priceSort: boolean | '';
  ar: string;
  hero: string;
  weapon: string;
  server: string;
  keyword: string;
  rangeMoney?: string;
}
