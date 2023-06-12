import { memo, useEffect, useRef } from "react";
import "./Main.css";

const Main = memo(({ className, color, type, delay, children }) => {
  const mainRef = useRef(null);

  // 해당 요소에 css 변수 setting
  useEffect(() => {
    mainRef.current.style.setProperty("--circle-delay", `${delay}s`);
  }, [delay]);

  return (
    <main className={`main ${className} ${type} ${color}`} ref={mainRef}>
      {children}
    </main>
  );
});

export default Main;

Main.defaultProps = {
  type: "",
  delay: 0,
  color: "default",
};
