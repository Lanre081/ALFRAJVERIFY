import axios from "axios";
import { getAccessToken } from "../Helpers/Auth/tokens";

const url = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: url,
  timeout: url?.includes("localhost") ? 10000 : 60000,
});

api.interceptors.request.use((config) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res.data,
);

export default api;
