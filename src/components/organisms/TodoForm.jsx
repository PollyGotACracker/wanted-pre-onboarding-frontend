import { memo, useEffect, useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Form from "../molecules/Form";

const TodoForm = memo(({ onChangeInput, inputValue, inputRef, handler }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(inputValue.length >= 1 ? false : true);
  }, [inputValue]);

  return (
    <Form className={"row grayscale simple"}>
      <Input
        dataset={"new-todo-input"}
        className={"full"}
        placeholder={"할 일을 입력하세요..."}
        autoComplete={"true"}
        onChange={onChangeInput}
        onKeyDown={handler}
        value={inputValue}
        refHook={inputRef}
      />
      <Button
        dataset={"new-todo-add-button"}
        onClick={handler}
        text={"추가"}
        disabled={isDisabled}
        className={"primary"}
      />
    </Form>
  );
});

export default TodoForm;
