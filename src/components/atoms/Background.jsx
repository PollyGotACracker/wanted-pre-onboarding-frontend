import { memo, useEffect, useRef } from "react";
import "./Background.css";

const Background = memo(({ type, delay, children }) => {
  const mainRef = useRef(null);

  useEffect(() => {
    mainRef.current.style.setProperty("--circle-delay", `${delay}s`);
  }, [delay]);

  return (
    <main className={`background ${type}`} ref={mainRef}>
      {children}
    </main>
  );
});

export default Background;
