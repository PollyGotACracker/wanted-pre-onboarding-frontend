import { NavLink } from "react-router-dom";

const NavAnchor = ({ className, to, icon, text }) => {
  const style = {
    color: "red",
  };

  return (
    <NavLink className={className} to={to} style={style}>
      {icon}
      {text}
    </NavLink>
  );
};

export default NavAnchor;
