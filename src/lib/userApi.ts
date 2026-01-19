import axios, { AxiosInstance } from "axios";
import { store } from "@/store";
import { NEXT_PUBLIC_API_URL } from "@/config/variables";

const BASE_URL = NEXT_PUBLIC_API_URL;

const userApi: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/users`,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

userApi.interceptors.request.use(
  (config) => {
    const state = store.getState() as any;
    const token = state.customerAuth?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default userApi;
