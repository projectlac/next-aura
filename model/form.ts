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
