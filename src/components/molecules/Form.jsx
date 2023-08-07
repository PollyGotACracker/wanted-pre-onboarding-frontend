import "./Form.css";

const Form = ({ className, children }) => {
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
};

export default Form;

Form.defaultProps = {
  className: "",
};
