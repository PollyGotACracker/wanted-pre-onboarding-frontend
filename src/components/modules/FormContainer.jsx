import "./FormContainer.css";

const FormContainer = ({ className, children }) => {
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

export default FormContainer;

FormContainer.defaultProps = {
  className: "",
};
