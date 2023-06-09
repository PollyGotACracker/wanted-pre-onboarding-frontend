const FormContainer = ({ direction, children }) => {
  const style = {
    flexDirection: direction,
  };

  return (
    <form className="form" style={style}>
      {children}
    </form>
  );
};

export default FormContainer;
