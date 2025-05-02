import { useEffect, useState } from "react";

import { JwtPayload } from "jwt-decode";
import { getFromLocalStorage } from "@/utils/LocalStorage";
import { decodeToken } from "@/utils/JwtDecode";
import { authKey } from "@/constants/authKey";

const useUserInfo = (): any | string => {
  const [userInfo, setUserInfo] = useState<any | string>("");

  useEffect(() => {
    const fetchUserInfo = () => {
      const authToken = getFromLocalStorage(authKey);
      if (authToken) {
        const decodedData: JwtPayload & { role: any } = decodeToken(
          authToken
        ) as JwtPayload & {
          role: any;
        };
        const userInfo: any = {
          ...decodedData,
          role: decodedData.role?.toLowerCase() || "",
        };
        setUserInfo(userInfo);
      } else {
        setUserInfo("");
      }
    };

    fetchUserInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;
