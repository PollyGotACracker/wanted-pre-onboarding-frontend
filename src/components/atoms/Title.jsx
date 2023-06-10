import { useMemo } from "react";
import "./Title.css";

const Title = ({ main, sub }) => {
  const animation = useMemo(() => {
    return [...main, ...sub].map((item, index) => {
      const delay = index * 0.6;
      return (
        <div
          className={main.includes(item) ? "title text main" : "title text sub"}
          key={item}
          style={{ animationDelay: `${delay}s` }}
        >
          {item}
        </div>
      );
    });
  }, [main, sub]);

  return <div className="title container">{animation}</div>;
};

export default Title;
