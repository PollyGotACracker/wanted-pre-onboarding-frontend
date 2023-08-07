const Label = ({ htmlFor, icon, text }) => {
  return (
    <label className="label" htmlFor={htmlFor}>
      {icon}
      {text}
    </label>
  );
};

export default Label;

Label.defaultProps = {
  htmlFor: "",
  icon: "",
  text: "",
};
