import { useCallback, useRef, useEffect, useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Form from "../molecules/Form";
import { useTodoContext } from "../../contexts/todoContext";

const TodoForm = () => {
  const { createTodo, createData } = useTodoContext();
  const [isDisabled, setIsDisabled] = useState(true);
  const [todo, setTodo] = useState("");
  const todoRef = useRef(null);

  const onChangeInput = useCallback(({ target }) => setTodo(target.value), []);

  const onKeyDownClickCreate = useCallback(
    async (e) => {
      if (todo.length < 1) return false;
      if (e.key === "Enter" || e.keyCode === 13 || e.type === "click") {
        const result = await createTodo(todo);
        if (result) {
          createData(result);
          setTodo("");
          todoRef.current.focus();
        }
      }
    },
    [todo, createTodo, createData]
  );

  useEffect(() => {
    setIsDisabled(todo.length >= 1 ? false : true);
  }, [todo]);

  return (
    <Form className={"row grayscale simple"}>
      <Input
        dataset={"new-todo-input"}
        className={"full"}
        placeholder={"할 일을 입력하세요..."}
        autoComplete={"true"}
        onChange={onChangeInput}
        onKeyDown={onKeyDownClickCreate}
        value={todo}
        refHook={todoRef}
      />
      <Button
        dataset={"new-todo-add-button"}
        onClick={onKeyDownClickCreate}
        text={"추가"}
        disabled={isDisabled}
        className={"primary"}
      />
    </Form>
  );
};

export default TodoForm;
