export interface IAccountVipAdmin {
  code: string;
  id: number;
  username: string;
  password: string;
  price: string;
  created_at: string;

  is_sold: boolean;
  description: string;
  name: string;
  slug: string;
  updated_at?: string;
  type?: string;
}
export interface IAccountShop {
  name: string;
  slug: string;
  avatar: string;
  price: string;
  code: string;
  description: string;
  is_sold: boolean;
  server?: string;
  ar_level?: string;
}
