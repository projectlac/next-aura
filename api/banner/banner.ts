import api from 'api/api';

export const getAll = () => {
  return api.get(`/information`);
};

export const getById = (id:string)=> {
  return api.get(`/information/${id}`);
};
export const update = (id:string,data:FormData)=> {
  return api.put(`/information/update/${id}`,data);
};
