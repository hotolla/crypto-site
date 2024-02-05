import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
export default api;
//
// api.interceptors.response.use(null, (thrown) => {
//   if (axios.isCancel(thrown)) {
//     return new Promise(() => {});
//   } else {
//     const { response = { status: 500 } } = thrown;
//     return Promise.reject(response);
//   }
// });

// async function refreshAccessToken() {
//   try {
//     const response = await axios.post('/refresh-token-endpoint');
//     const { token } = response.data;
//     localStorage.setItem('token', token);
//     return token;
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     throw new Error('Failed to refresh token');
//   }
// }
//
// api.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const token = await refreshAccessToken();
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
//     return api(originalRequest);
//   }
//   return Promise.reject(error);
// });
