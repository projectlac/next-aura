import api from 'api/api';



export const addCategory = (name: string) => {
  return api.post(`/category/create`,{name});
};

export const deleteCategory = (slug: string) => {
    return api.delete(`/category/delete/${slug}`);
};
  
export const updateCategory = (slug: string,name:string) => {
    return api.put(`/category/update/${slug}`,{name});
};
export const getCategoryBySlug  = (slug: string) => {
    return api.get(`/category/${slug}`);
};
export const getCategory  = () => {
    return api.get(`/category`);
};
