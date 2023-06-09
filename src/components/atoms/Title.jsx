import { memo } from "react";
import "../../styles/Atoms.css";

const Title = memo(({ text }) => {
  return <div className="title">{text}</div>;
});

export default Title;
