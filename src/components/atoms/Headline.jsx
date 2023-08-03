import { memo } from "react";
import "./Headline.css";

const Headline = memo(({ text }) => {
  return <h1 className="headline">{text}</h1>;
});

export default Headline;
