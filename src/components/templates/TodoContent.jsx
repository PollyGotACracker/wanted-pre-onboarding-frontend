import { useState, useCallback, useRef, memo } from "react";
import Header from "../../components/atoms/Header";
import Spinner from "../../components/atoms/Spinner";
import TodoForm from "../../components/organisms/TodoForm";
import TodoList from "../../components/organisms/TodoList";
import { ERROR_TODO } from "../../constants/message";
import { useTodoContext } from "../../contexts/todoContext";
import { createTodo } from "../../services/todo.service";

const TodoContent = memo(({ isLoading, token }) => {
  const { createData } = useTodoContext();
  const [todo, setTodo] = useState("");
  const todoRef = useRef(null);

  const onChangeInput = useCallback(({ target }) => setTodo(target.value), []);

  const onKeyDownClickCreate = useCallback(
    async (e) => {
      if (todo.length < 1) return false;
      if (e.key === "Enter" || e.keyCode === 13 || e.type === "click") {
        const result = await createTodo({ token, todo });
        if (result) {
          createData({ item: result });
          setTodo("");
          todoRef.current.focus();
        } else {
          window.alert(ERROR_TODO.create);
        }
      }
    },
    [todo, token, createData]
  );

  return (
    <>
      <Header text={"To Do"} />
      <TodoForm
        onChangeInput={onChangeInput}
        inputValue={todo}
        inputRef={todoRef}
        handler={onKeyDownClickCreate}
      />
      {isLoading ? <Spinner loading={isLoading} /> : <TodoList />}
    </>
  );
});

export default TodoContent;
