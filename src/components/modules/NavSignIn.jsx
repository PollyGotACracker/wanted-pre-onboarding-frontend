import NavAnchor from "../atoms/NavAnchor";
import NavButton from "../atoms/NavButton";
import { RiHome4Fill, RiLogoutBoxLine } from "react-icons/ri";

const NavSignIn = ({ email, signOut }) => {
  return (
    <>
      <NavAnchor
        className={"todo"}
        to={"/todo"}
        icon={<RiHome4Fill />}
        text={"할 일"}
      />
      <span className="user-email">{email}</span>
      <NavButton
        className={"signout"}
        onClick={signOut}
        icon={<RiLogoutBoxLine />}
        text={"로그아웃"}
      />
    </>
  );
};

export default NavSignIn;
