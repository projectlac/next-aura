import Axios from 'axios';

let urls = {
  test: `http://localhost:8888`,
  development: 'https://muabanaccgenshin.online/',
  production: 'https://muabanaccgenshin.online/'
};
const apiFormData = Axios.create({
  baseURL: 'https://muabanaccgenshin.online/',
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data'
  }
});

export default apiFormData;
