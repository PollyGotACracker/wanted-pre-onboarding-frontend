import { memo } from "react";
import "./LabelForContainer.css";

const LabelForContainer = memo(({ children }) => {
  return <div className="label-for">{children}</div>;
});

export default LabelForContainer;
