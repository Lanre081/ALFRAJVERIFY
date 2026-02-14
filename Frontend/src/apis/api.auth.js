import api from "./api.client";

const authApi = {
  login: (payload) => api.post("auth/login", payload),
  register: (payload) => api.post("auth/register", payload),
};

export default authApi;
