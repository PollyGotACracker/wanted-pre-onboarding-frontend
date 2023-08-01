import { useEffect, useState } from "react";

const useInput = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");

  useEffect(() => {
    setIsDisabled(value.length >= 1 ? false : true);
  }, [value]);

  const changeInputValue = ({ target }) => setValue(target.value);

  return { changeInputValue, value, setValue, isDisabled };
};

export default useInput;
