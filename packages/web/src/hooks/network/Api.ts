import axios from 'axios';

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL.replace(/\/$/, ''),
});
