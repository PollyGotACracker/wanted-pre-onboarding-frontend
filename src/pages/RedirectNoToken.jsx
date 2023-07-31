import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ALERT_AUTH } from "../constants/message";
import TokenStorage from "../utils/tokenStorage";

const RedirectNoToken = () => {
  const tokenStorage = new TokenStorage();
  const token = tokenStorage.get();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.key === "default" && !token) {
      navigate("/signin", {
        state: { message: ALERT_AUTH.noToken },
      });
    }
  }, [location?.key, navigate, token]);

  return token && <Outlet />;
};

export default RedirectNoToken;
