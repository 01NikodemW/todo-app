import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.EXPO_PUBLIC_API_URL,
};
export const axiosInstance = axios.create(config);
