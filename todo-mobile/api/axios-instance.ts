import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: "http://192.168.0.101:3000",
};
export const axiosInstance = axios.create(config);
