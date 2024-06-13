import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  // baseURL: process.env.NEXT_PUBLIC_API_ENTRYPOINT,
  // baseURL: " http://localhost:3000",
  baseURL: "http://192.168.0.101:3000",
};
export const axiosInstance = axios.create(config);
