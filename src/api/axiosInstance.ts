import axios from 'axios';

const BASE_URL = 'https://embed-token-with-auth.onrender.com';

export const axiosInstance = axios.create( {
  baseURL: BASE_URL,
  withCredentials: true,
} );

