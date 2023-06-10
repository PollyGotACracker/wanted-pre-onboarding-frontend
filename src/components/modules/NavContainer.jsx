import "./NavContainer.css";
import { memo } from "react";

const NavContainer = memo(({ children }) => {
  return <nav className="nav">{children}</nav>;
});

export default NavContainer;
