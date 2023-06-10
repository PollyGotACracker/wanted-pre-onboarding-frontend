import { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import NavSignOut from "./templates/NavSignOut";
import NavSignIn from "./templates/NavSignIn";
import NavContainer from "./modules/NavContainer";
import "./Nav.css";

const Nav = memo(({ token, email }) => {
  const { removeToken, userSignOut } = useAuthContext();
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    removeToken();
    userSignOut();
    navigate("/", { replace: true });
  }, [removeToken, userSignOut, navigate]);

  const navLinks = useMemo(() => {
    if (!token) return <NavSignOut />;
    if (token) return <NavSignIn email={email} signOut={signOut} />;
  }, [token, email, signOut]);

  return <NavContainer>{navLinks}</NavContainer>;
});

export default Nav;
