import "./Nav.css";
import { memo } from "react";
import Button from "../atoms/Button";
import { HiMenu } from "react-icons/hi";
import { useMenuContext } from "../../contexts/menuContext";

const Nav = memo(({ render, children }) => {
  const { sidebarState, toggleSidebar } = useMenuContext();

  const onClickButtons = (e) => {
    const itemTag = e.target.tagName;
    if (itemTag === "A" || itemTag === "BUTTON") toggleSidebar();
  };

  return (
    <>
      <nav className="nav">
        {render({ className: "home" })}

        <Button className="menu" onClick={toggleSidebar} icon={<HiMenu />} />
      </nav>
      <div className={`sidebar ${sidebarState}`} onClick={onClickButtons}>
        {children}
      </div>
    </>
  );
});

export default Nav;
