import { authKey } from "@/constants/authKey";
import { setToLocalStorage } from "@/utils/LocalStorage";

export const storedToken = async (token: string) => {
  return setToLocalStorage(authKey, token);
};
