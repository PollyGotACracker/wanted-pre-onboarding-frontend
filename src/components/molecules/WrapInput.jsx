import { memo } from "react";
import "./WrapInput.css";

const WrapInput = memo(({ children }) => {
  return <div className="wrap-input">{children}</div>;
});

export default WrapInput;
