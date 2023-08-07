import "./Button.css";

const Button = ({
  className,
  label,
  dataset,
  onClick,
  disabled,
  type,
  icon,
  text,
}) => {
  return (
    <button
      className={`button ${className}`}
      aria-label={label}
      data-testid={dataset}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: "button",
  className: "",
  disabled: false,
  icon: "",
  label: "",
};
