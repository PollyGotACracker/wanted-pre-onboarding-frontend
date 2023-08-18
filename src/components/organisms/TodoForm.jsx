import { useRef } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Form from "../molecules/Form";
import useInput from "../../hooks/useInput";
import useTodoForm from "../../hooks/useTodoForm";

const TodoForm = () => {
  const { changeInputValue, value, setValue, isDisabled } = useInput();
  const { createTodoItem } = useTodoForm();
  const todoRef = useRef(null);

  const createHandler = async (e) => {
    const result = await createTodoItem(e, value);
    if (result) {
      setValue("");
      todoRef.current.focus();
    }
  };

  return (
    <Form className={"row grayscale simple"}>
      <Input
        dataset={"new-todo-input"}
        className={"full"}
        placeholder={"할 일을 입력하세요..."}
        autoComplete={"true"}
        onChange={changeInputValue}
        onKeyDown={createHandler}
        value={value}
        refHook={todoRef}
      />
      <Button
        dataset={"new-todo-add-button"}
        onClick={createHandler}
        text={"추가"}
        disabled={isDisabled}
        className={"primary"}
      />
    </Form>
  );
};

export default TodoForm;
