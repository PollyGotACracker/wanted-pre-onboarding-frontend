import { memo } from "react";
import "./FormContainer.css";

const FormContainer = memo(({ className, children }) => {
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

export default FormContainer;

FormContainer.defaultProps = {
  className: "",
};
