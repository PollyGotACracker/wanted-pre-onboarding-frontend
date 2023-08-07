import "./Alert.css";
import { useRef } from "react";
import { TbAlertTriangleFilled } from "react-icons/tb";

const Alert = ({ text }) => {
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
};

export default Alert;
