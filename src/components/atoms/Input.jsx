import "../../styles/Atoms.css";

const Input = ({
  dataset,
  size,
  type,
  name,
  placeholder,
  autoComplete,
  value,
  onChange,
  refHook,
}) => {
  const width = {
    full: "100%",
  };

  const style = {
    width: width[size],
  };

  return (
    <input
      className={`input`}
      data-testid={dataset}
      name={name}
      placeholder={placeholder}
      type={type}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      spellCheck="false"
      ref={refHook}
      style={style}
    />
  );
};

export default Input;

Input.defaultProps = {
  type: "text",
  size: "default",
  autoComplete: "true",
  refHook: null,
};
