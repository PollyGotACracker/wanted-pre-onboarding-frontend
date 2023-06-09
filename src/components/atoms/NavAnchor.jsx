import { memo } from "react";
import "../../styles/Atoms.css";
import { NavLink } from "react-router-dom";

const NavAnchor = memo(({ className, to, icon, text }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `navAnchor ${className} active` : `navAnchor ${className}`
      }
      to={to}
    >
      {icon}
      {text}
    </NavLink>
  );
});

export default NavAnchor;

NavAnchor.defaultProps = {
  icon: "",
};
