import { memo } from "react";
import "./Header.css";

const Header = memo(({ text }) => {
  return <header className="header">{text}</header>;
});

export default Header;
