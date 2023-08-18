import "./Alert.css";
import { memo, useRef } from "react";
import { TbAlertTriangleFilled } from "react-icons/tb";

const Alert = memo(({ text }) => {
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

export default Alert;
