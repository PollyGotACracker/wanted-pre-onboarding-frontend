import { useCallback, useMemo } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";
import { RiHome4Fill, RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
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
    if (!isSignIn) {
      return (
        <>
          <NavLink className="signin" to={`/signin`}>
            <RiLoginBoxLine />
            로그인
          </NavLink>
          <NavLink className="signup" to={`/signup`}>
            <RiHome4Fill />
            회원가입
          </NavLink>
        </>
      );
    }
    if (isSignIn) {
      return (
        <>
          <NavLink className="todo" to={`/todo`}>
            <RiHome4Fill />할 일
          </NavLink>
          <span className="user-email">{email}</span>
          <button className="signout" onClick={signOut}>
            <RiLogoutBoxLine />
            로그아웃
          </button>
        </>
      );
    }
  }, [isSignIn, email, signOut]);

  return <nav className="Nav">{navLinks}</nav>;
};

export default Nav;
