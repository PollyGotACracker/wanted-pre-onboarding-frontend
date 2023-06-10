import { memo, useEffect, useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import FormContainer from "../modules/FormContainer";

const TodoForm = memo(
  ({ onChangeInput, inputValue, inputRef, onClickButton }) => {
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
      setIsDisabled(inputValue.length >= 1 ? false : true);
    }, [inputValue]);

    return (
      <FormContainer className={"row default simple"}>
        <Input
          dataset={"new-todo-input"}
          className={"full"}
          placeholder={"할 일을 입력하세요..."}
          onChange={onChangeInput}
          value={inputValue}
          refHook={inputRef}
        />
        <Button
          dataset={"new-todo-add-button"}
          onClick={onClickButton}
          text={"추가"}
          disabled={isDisabled}
          className={"primary"}
        />
      </FormContainer>
    );
  }
);

export default TodoForm;
