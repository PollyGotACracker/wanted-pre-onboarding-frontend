import { memo } from "react";
import "./Form.css";

const Form = memo(({ className, children }) => {
  return (
    <form
      className={`form ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </form>
  );
});

export default Form;

Form.defaultProps = {
  className: "",
};
