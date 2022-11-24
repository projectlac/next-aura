import api from 'api/api';



export const addProduct = (formdata: FormData) => {
  return api.post(`/product/create`,formdata);
};

export const deleteProduct = (slug: string) => {
    return api.delete(`/Product/delete/${slug}`);
};
  
export const updateProduct = (slug: string,formdata: FormData) => {
    return api.put(`/Product/update/${slug}`,formdata);
};
export const getProductBySlug  = (slug: string) => {
    return api.get(`/Product/${slug}`);
};
export const getProduct  = () => {
    return api.get(`/Product`);
};
