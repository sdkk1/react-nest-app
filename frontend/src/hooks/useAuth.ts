import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Payload } from "../types/payload";

type AuthInfo = {
  checked: boolean;
  isAuthenticated: boolean;
};

const initAuthInfo = { checked: false, isAuthenticated: false };
const authenticatedInfo = { checked: true, isAuthenticated: true };
const notAuthenticatedInfo = { checked: true, isAuthenticated: false };

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>(initAuthInfo);

  useEffect(() => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const decodedToken = jwtDecode<Payload>(token);

        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setAuthInfo(notAuthenticatedInfo);
        } else {
          setAuthInfo(authenticatedInfo);
        }
      } else {
        setAuthInfo(notAuthenticatedInfo);
      }
    } catch (error) {
      setAuthInfo(notAuthenticatedInfo);
    }
  }, []);

  return authInfo;
};
