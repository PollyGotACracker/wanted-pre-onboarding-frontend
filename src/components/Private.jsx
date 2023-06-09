import { useAuthContext } from "../contexts/authContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ERROR_AUTH } from "../constants/error";

const Private = () => {
  const { getToken } = useAuthContext();
  const { token } = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/signin", {
        replace: true,
        state: { message: ERROR_AUTH.noToken },
      });
    }
  }, []);

  return token && <Outlet />;
};

export default Private;
