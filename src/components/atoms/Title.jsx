import { useMemo } from "react";
import "./Title.css";

const Title = ({ main, sub, delay }) => {
  const animation = useMemo(() => {
    return [...main, ...sub].map((item, index) => {
      const itemDelay = index * delay;
      return (
        <div
          className={main.includes(item) ? "title text main" : "title text sub"}
          key={item}
          style={{ animationDelay: `${itemDelay}s` }}
        >
          {item}
        </div>
      );
    });
  }, [main, sub, delay]);

  return <div className="title container">{animation}</div>;
};

export default Title;
