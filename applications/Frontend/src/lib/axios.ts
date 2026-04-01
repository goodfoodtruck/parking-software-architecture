import axios, { AxiosError } from 'axios';
import axiosError from './axiosError';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' }
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: AxiosError) => axiosError.Error(error)
);
export default axiosInstance;
