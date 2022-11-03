import Axios from 'axios';

let urls = {
  test: `http://localhost:8888`,
  development: 'https://muabanaccgenshin.online/',
  production: 'https://muabanaccgenshin.online/'
};
const api = Axios.create({
  baseURL: urls[process.env.APP_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
