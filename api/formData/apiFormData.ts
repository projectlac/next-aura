import Axios from 'axios';

const apiFormData = Axios.create({
  baseURL: 'https://muabanaccgenshin.online/',
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data'
  }
});

export default apiFormData;
