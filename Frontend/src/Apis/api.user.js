import api from "./api.client";

const userApi = {
    getProfile: () => api.get("/user/profile"),
}

export default userApi