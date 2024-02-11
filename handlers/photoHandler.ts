import { BACKEND_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const upadtePhoto = async (
  id: string,
  title: string,
  description: string
) => {
  let jwt = await AsyncStorage.getItem("jwt");

  const options = {
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(jwt!)}`,
    },
  };
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/photos/update/${id}`,
      {
        title,
        description,
      },
      options
    );

    return response.data;
  } catch (error: any) {
    return error.response.data;
  } finally {
    // setIsLoading(false);
  }
};
