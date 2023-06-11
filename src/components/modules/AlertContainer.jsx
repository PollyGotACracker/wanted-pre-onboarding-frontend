import "./AlertContainer.css";
import { memo, useRef } from "react";
import { TbAlertTriangleFilled } from "react-icons/tb";

const AlertContainer = memo(({ text }) => {
  const alertRef = useRef();

  return (
    <div
      className={`alert ${text === "" ? "hidden" : "visible"}`}
      ref={alertRef}
    >
      <TbAlertTriangleFilled />
      {text}
    </div>
  );
});

export default AlertContainer;
