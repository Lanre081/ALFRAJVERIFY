  import { useState } from "react";
  import authApi from "../apis/api.auth";

  export default function useAuth() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = async (apiCall) => {
      setLoading(true);
      setError(null);
      setData(null)
      

      try {
        const response = await apiCall();
        setData(response);
        console.log(response)
      } catch (err) {

        setError(err?.response?.data);  
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
