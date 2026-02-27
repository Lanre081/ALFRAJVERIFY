import { useState } from "react";
import userApi from "../Apis/api.user"

export default function useUserData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (apiCall) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await apiCall();
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const methods = {
    getProfile: () => execute(() => userApi.getProfile()),
  };

  return { data, loading, error, ...methods };
}
