import "./Input.css";

const Input = ({
  dataset,
  id,
  className,
  type,
  name,
  placeholder,
  autoComplete,
  value,
  onChange,
  refHook,
}) => {
  return (
    <input
      id={id}
      className={`input ${className}`}
      data-testid={dataset}
      name={name}
      placeholder={placeholder}
      type={type}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      spellCheck="false"
      ref={refHook}
    />
  );
};

export default Input;

Input.defaultProps = {
  type: "text",
  id: "",
  className: "",
  size: "default",
  autoComplete: "true",
  refHook: null,
};
