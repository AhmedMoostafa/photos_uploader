import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@env";
import { Photo } from "@/types/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useFetch<type>(endpoint: string, query: any) {
  const [data, setData] = useState<type>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      let jwt = await AsyncStorage.getItem("jwt");
      const options = {
        method: "GET",
        url: `${BACKEND_URL}/${endpoint}`,
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(jwt!)}`,
        },
        params: { ...query },
      };

      const response = await axios.request(options);

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
}

export default useFetch;
