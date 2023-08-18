import { useCallback, useMemo } from "react";
import TokenStorage from "../../utils/tokenStorage";
import emailStorage from "../../utils/emailStorage";
import useRouter from "../../hooks/useRouter";
import { useAuthContext } from "../../contexts/authContext";
import NavAnchor from "../atoms/NavAnchor";
import NavSignOut from "../molecules/NavSignOut";
import NavSignIn from "../molecules/NavSignIn";
import Nav from "../molecules/Nav";
import "./NavBar.css";

const NavBar = () => {
  const { signOut } = useAuthContext();
  const tokenStorage = new TokenStorage();
  const token = tokenStorage.get();
  const email = emailStorage.get();
  const { replaceTo } = useRouter();

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
