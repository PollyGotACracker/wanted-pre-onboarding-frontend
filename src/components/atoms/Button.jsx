import { memo } from "react";
import "../../styles/Atoms.css";

const Button = memo(({ className, dataset, onClick, disabled, type, text }) => {
  return (
    <button
      className={`button ${className}`}
      data-testid={dataset}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
});

export default Button;

Button.defaultProps = {
  type: "button",
  disabled: false,
};
