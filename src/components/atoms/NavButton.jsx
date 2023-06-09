import { memo } from "react";
import "../../styles/Atoms.css";

const NavButton = memo(({ className, onClick, icon, text }) => {
  return (
    <button className={`navButton ${className}`} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
});

export default NavButton;
