import axios from 'axios';
import { useAuth } from '@/app/components/AuthProvider';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// api.interceptors.request.use((config) => {
//   const { token } = useAuth();
//   console.log(token)
//   if (token) {
//     console.log(config.data);
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default api;