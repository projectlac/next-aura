import Axios from 'axios';

const apiFormData = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data'
  }
});

export default apiFormData;
