import axios from "axios"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('taskzen_token');
  // Skip token for auth endpoints to avoid issues with invalid tokens
  if (token && !config.url?.includes('/auth/login') && !config.url?.includes('/auth/register')) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
