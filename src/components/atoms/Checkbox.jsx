import "./Checkbox.css";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const Checkbox = ({ checked, onChange, text }) => {
  return (
    <label className="checkbox">
      <input
        className="checkbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      <span className={checked ? "checkbox checked" : "checkbox"}>{text}</span>
    </label>
  );
};

export default Checkbox;

Checkbox.defaultProps = {
  text: "",
};
