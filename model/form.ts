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
