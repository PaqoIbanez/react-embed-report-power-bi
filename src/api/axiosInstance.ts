import axios from 'axios';

const BASE_URL = 'https://embed-token-with-auth.onrender.com'; 
// Ajusta la URL de tu servidor

// Crea la instancia de axios
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para inyectar el token si existe en localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O 'authToken'
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

