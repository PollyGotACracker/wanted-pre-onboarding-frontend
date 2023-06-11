import "./NavContainer.css";
import { memo } from "react";
import Button from "../atoms/Button";
import { HiMenu } from "react-icons/hi";
import { useMenuContext } from "../../contexts/menuContext";

const NavContainer = memo(({ render, children }) => {
  const { sidebarState, toggleSidebar } = useMenuContext();

  return (
    <nav className="nav">
      {render({ className: "home" })}
      <div className={`sidebar ${sidebarState}`}>{children}</div>
      <Button className="menu" onClick={toggleSidebar} icon={<HiMenu />} />
    </nav>
  );
});

export default NavContainer;
