import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { ALERT_AUTH } from "../constants/message";

const RedirectNoToken = () => {
  const { getToken } = useAuthContext();
  const { token } = getToken();
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
