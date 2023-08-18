import { useEffect, useState } from "react";
import useRouter from "./useRouter";
import TokenStorage from "../utils/tokenStorage";

const useRedirection = ({ redirectIfAuth, path, state }) => {
  const { replaceTo } = useRouter();
  const tokenStorage = new TokenStorage();
  const token = tokenStorage.get();
  const [isAuth, setIsAuth] = useState(!!token);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
      redirectIfAuth && replaceTo(path, state);
    } else {
      setIsAuth(false);
      !redirectIfAuth && replaceTo(path, state);
    }
  }, [token, redirectIfAuth, replaceTo, path, state]);

  return isAuth;
};

export default useRedirection;
