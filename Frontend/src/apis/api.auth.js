import api from "./api.client";

const authApi = {
  login: (payload) => api.post("/users/login", payload),
  register: (payload) => api.post("/users/register", payload),
};

export default authApi;
