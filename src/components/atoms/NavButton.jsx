import { memo } from "react";
import "./NavButton.css";

const NavButton = memo(({ className, onClick, icon, text }) => {
  return (
    <button
      className={`nav-button ${className}`}
      onClick={onClick}
      type="button"
    >
      {icon}
      {text}
    </button>
  );
});

export default NavButton;
