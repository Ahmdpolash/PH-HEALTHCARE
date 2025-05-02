import { authKey } from "@/constants/authKey";
import { instance as axiosInstance } from "@/helpers/axios/axiosInstance";
import { decodeToken } from "@/utils/JwtDecode";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/utils/LocalStorage";

// store token into local storage
export const storedToken = async (token: string) => {
  return setToLocalStorage(authKey, token);
};

// get user info
export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  //   console.log(authToken);
  if (authToken) {
    const decodedData: any = decodeToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  } else {
    return "";
  }
};

// check if user is logged in
export const isLoggedIn = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return !!authToken;
  }
};

// logout

export const removeUser = () => {
  return removeFromLocalStorage(authKey);
};

// generate new accesstoken

export const generateNewAccessToken = async () => {
  return await axiosInstance({
    url: "http://localhost:5000/api/v1/auth/refresh-token",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
