import axios from 'axios';

export const ApiClient = axios.create({
  baseURL: 'https://dev.shortly.com.br', //import.meta.env.VITE_API_URL,
});
