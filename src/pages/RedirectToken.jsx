import { useAuthContext } from "../contexts/authContext";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const RedirectToken = () => {
  const { getToken } = useAuthContext();
  const { token } = getToken();
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
