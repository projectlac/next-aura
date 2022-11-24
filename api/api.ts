import Axios from 'axios';
import { env } from 'process';

const api = Axios.create({
  baseURL: env.NEXT_PUBLIC_ENDPOINT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;
