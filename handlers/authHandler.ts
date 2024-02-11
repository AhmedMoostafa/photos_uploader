import { BACKEND_URL } from "@env";
import axios from "axios";
export const login = async (email: string, password: string) => {
  const options = {
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `${BACKEND_URL}/user/login`,
      {
        email,
        password,
      },
      options
    );

    return response.data;
  } catch (error: any) {
    if (!error.response) {
      return { error: "Internal server Error" };
    }
    return error.response.data;
  } finally {
    // setIsLoading(false);
  }
};

export const signUp = async (
  firstName: string,
  email: string,
  password: string
) => {
  const options = {
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `${BACKEND_URL}/user/signup`,
      {
        email,
        password,
        firstName,
      },
      options
    );

    return response.data;
  } catch (error: any) {
    if (!error.response) {
      return { error: "Internal server Error" };
    }
    return error.response.data;
  } finally {
    // setIsLoading(false);
  }
};
