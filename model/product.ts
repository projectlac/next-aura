export interface Atribute {
  size: string;
  price: number;
}
export interface IProduct {
  name: string;
  detail: Atribute[];
  description: string;
  amount: number;
  images:ImageProduct[];
  _id:string;
  createdAt:string;
  categories:Category[];
  slug:string
}
export interface ImageProduct {
  createdAt: string;
  updatedAt: string;
  url: string;
  _id: string
}
export interface Category {
  createdAt: string;
  updatedAt: string;
  slug: string;
  name: string;
  _id: string
}

