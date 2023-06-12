import { memo } from "react";
import "./Status.css";

const Status = memo(({ num, title, desc }) => {
  return (
    <div className="status">
      <div className="status-number">{num}</div>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
});

export default Status;
