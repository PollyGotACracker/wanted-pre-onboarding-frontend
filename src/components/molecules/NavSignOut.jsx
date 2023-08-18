import NavAnchor from "../atoms/NavAnchor";
import { RiBallPenFill, RiLoginBoxLine } from "react-icons/ri";

const NavSignOut = () => {
  return (
    <>
      <NavAnchor
        className={"signup"}
        to={"/signup"}
        icon={<RiBallPenFill />}
        text={"회원가입"}
      />
      <NavAnchor
        className={"signin"}
        to={"/signin"}
        icon={<RiLoginBoxLine />}
        text={"로그인"}
      />
    </>
  );
};

export default NavSignOut;
