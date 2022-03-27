import { useState, useCallback } from "react";
import axios from "axios";

const useAxiosFetch = (requestConfig) => {
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const url = `${
        requestConfig.baseUrl
          ? requestConfig.baseUrl
          : process.env.REACT_APP_BASE_SERVER_URL
      }/${requestConfig.url}`;

      const response = await axios({
        url,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
        },
        method: requestConfig.method ? requestConfig.method : "GET",
        data: requestConfig.data ? requestConfig.data : null,
      });
      if (response.status !== 200) {
        throw new Error();
      }
      const data = await response.data;
      applyData(data);
    } catch (err) {
      setFetchError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    fetchError,
    sendRequest,
  };
};

export default useAxiosFetch;
