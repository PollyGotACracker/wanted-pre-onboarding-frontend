import { memo } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import FormContainer from "../modules/FormContainer";

const TodoForm = memo(
  ({ onChangeInput, inputValue, inputRef, onClickButton }) => {
    return (
      <FormContainer direction={"row"}>
        <Input
          dataset={"new-todo-input"}
          size={"full"}
          placeholder={"할 일을 입력하세요..."}
          onChange={onChangeInput}
          value={inputValue}
          refHook={inputRef}
        />
        <Button
          dataset={"new-todo-add-button"}
          onClick={onClickButton}
          text={"추가"}
        />
      </FormContainer>
    );
  }
);

export default TodoForm;
