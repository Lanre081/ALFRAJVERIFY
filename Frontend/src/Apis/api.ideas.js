import api from "./api.client";

const ideasApi = {
  getAll: () => api.get("/ideas"),
  getOne: (id) => api.get(`/ideas/${id}`),
  create: (payload) => api.post("/ideas", payload),
  createBulk: (payload) => api.post("/ideas/bulk", payload),
  update: ({id, update}) => api.put(`/ideas/${id}`, update),
  delete: (id) => api.delete(`/ideas/${id}`),
};

export default ideasApi;
