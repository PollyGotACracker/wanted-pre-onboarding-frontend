import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TokenStorage from "../utils/tokenStorage";

const RedirectToken = () => {
  const tokenStorage = new TokenStorage();
  const token = tokenStorage.get();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.key === "default" && token) {
      navigate("/todo");
    }
  }, [location?.key, navigate, token]);

  return !token && <Outlet />;
};

export default RedirectToken;
