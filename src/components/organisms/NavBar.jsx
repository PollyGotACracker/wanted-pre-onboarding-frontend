import { memo, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext";
import NavAnchor from "../atoms/NavAnchor";
import NavSignOut from "../molecules/NavSignOut";
import NavSignIn from "../molecules/NavSignIn";
import Nav from "../molecules/Nav";
import "./NavBar.css";

const NavBar = memo(({ token, email }) => {
  const { removeToken, userSignOut } = useAuthContext();
  const navigate = useNavigate();

  const signOut = useCallback(() => {
    navigate("/", { replace: true });
    removeToken();
    userSignOut();
  }, [removeToken, userSignOut, navigate]);

  const navLinks = useMemo(() => {
    if (!token) return <NavSignOut />;
    if (token) return <NavSignIn email={email} signOut={signOut} />;
  }, [token, email, signOut]);

  return (
    <Nav
      render={({ className }) => (
        <NavAnchor className={className} to={"/"} text={"My TodoList"} />
      )}
    >
      {navLinks}
    </Nav>
  );
});

export default NavBar;
