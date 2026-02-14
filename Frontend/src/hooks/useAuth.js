import { useState } from "react";
import authApi from "../apis/api.auth";

export default function useAuth() {
  const [data, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (apiCall) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();
      setResult(response);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Something went wrong";

      setError(message);
      console.error(err, err?.response);
    } finally {
      setLoading(false);
    }
  };

  const methods = {
    login: (payload) => execute(() => authApi.login(payload)),
    register: (payload) => execute(() => authApi.register(payload)),
  };

  return { data, loading, error, ...methods };
}
