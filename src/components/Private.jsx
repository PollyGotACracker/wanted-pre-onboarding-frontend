import { useAuthContext } from "../contexts/authContext";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ERROR_AUTH } from "../constants/error";

const Private = () => {
  const { getToken } = useAuthContext();
  const { token } = getToken();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.key === "default" && !token) {
      navigate("/signin", {
        replace: true,
        state: { message: ERROR_AUTH.noToken },
      });
    }
  }, [location?.key, navigate, token]);

  return token && <Outlet />;
};

export default Private;
