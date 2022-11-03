import Axios from 'axios';

const api = Axios.create({
  baseURL: 'https://muabanaccgenshin.online/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
