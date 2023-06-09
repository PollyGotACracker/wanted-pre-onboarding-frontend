import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import NavSignOut from "./modules/NavSignOut";
import NavSignIn from "./modules/NavSignIn";
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const { email, isSignIn, removeToken, userSignOut } = useAuthContext();

  const signOut = useCallback(() => {
    removeToken();
    userSignOut();
    navigate("/", { replace: true });
  }, [removeToken, userSignOut, navigate]);

  const navLinks = useMemo(() => {
    if (!isSignIn) return <NavSignOut />;
    if (isSignIn) return <NavSignIn email={email} signOut={signOut} />;
  }, [isSignIn, email, signOut]);

  return <nav className="Nav">{navLinks}</nav>;
};

export default Nav;
