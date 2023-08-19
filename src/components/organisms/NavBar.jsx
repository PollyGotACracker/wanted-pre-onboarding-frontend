import { useCallback, useMemo } from "react";
import useRouter from "../../hooks/useRouter";
import { useAuthContext } from "../../contexts/authContext";
import emailStorage from "../../utils/emailStorage";
import NavAnchor from "../atoms/NavAnchor";
import NavSignOut from "../molecules/NavSignOut";
import NavSignIn from "../molecules/NavSignIn";
import Nav from "../molecules/Nav";
import "./NavBar.css";

const NavBar = ({ tokenStorage }) => {
  const { replaceTo } = useRouter();
  const { signOut } = useAuthContext();
  const token = tokenStorage.get();
  const email = emailStorage.get();

  const userSignOut = useCallback(() => {
    signOut();
    replaceTo("/");
  }, [signOut, replaceTo]);

  const navLinks = useMemo(() => {
    return !token ? (
      <NavSignOut />
    ) : (
      <NavSignIn email={email} userSignOut={userSignOut} />
    );
  }, [token, email, userSignOut]);

  return (
    <Nav
      render={({ className }) => (
        <NavAnchor className={className} to={"/"} text={"My TodoList"} />
      )}
    >
      {navLinks}
    </Nav>
  );
};

export default NavBar;
