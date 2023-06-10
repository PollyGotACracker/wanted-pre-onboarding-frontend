import "./AlertContainer.css";
import { memo, useEffect, useRef } from "react";
import { TbAlertTriangleFilled } from "react-icons/tb";

const AlertContainer = memo(({ text }) => {
  const alertRef = useRef();
  useEffect(() => {
    if (text === "") alertRef.current.style = "display: none";
  }, [text]);

  return (
    <div className="alert" ref={alertRef}>
      <TbAlertTriangleFilled />
      {text}
    </div>
  );
});

export default AlertContainer;
