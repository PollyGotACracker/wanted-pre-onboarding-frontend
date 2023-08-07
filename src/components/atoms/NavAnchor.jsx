import "./NavAnchor.css";
import { NavLink } from "react-router-dom";

const NavAnchor = ({ className, to, icon, text }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `nav-anchor ${className} active` : `nav-anchor ${className}`
      }
      to={to}
    >
      {icon}
      {text}
    </NavLink>
  );
};

export default NavAnchor;

NavAnchor.defaultProps = {
  icon: "",
};
