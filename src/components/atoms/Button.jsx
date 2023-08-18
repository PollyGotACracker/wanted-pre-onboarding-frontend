import { memo } from "react";
import "./Button.css";

const Button = memo(
  ({ className, dataset, onClick, disabled, type, icon, text }) => {
    return (
      <button
        className={`button ${className}`}
        data-testid={dataset}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {icon}
        {text}
      </button>
    );
  }
);

export default Button;

Button.defaultProps = {
  type: "button",
  className: "",
  disabled: false,
  icon: "",
};
