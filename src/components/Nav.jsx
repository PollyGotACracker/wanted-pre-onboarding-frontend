import { useNavigate, NavLink } from "react-router-dom";
import { RiHome4Fill, RiLoginBoxLine, RiLogoutBoxLine } from "react-icons/ri";
import { useAuthContext } from "../contexts/authContext";
import { useCallback, useMemo } from "react";

const Nav = () => {
  const navigate = useNavigate();
  const { email, isSignIn, removeToken } = useAuthContext();

  const signOut = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    removeToken();
    navigate("/", { replace: true });
  }, [navigate, removeToken]);

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
          <span>{email}</span>
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
