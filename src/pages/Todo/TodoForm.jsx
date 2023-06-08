import { useState, useCallback, useRef } from "react";
import { createTodo } from "../../services/todo.service";
import { useAuthContext } from "../../contexts/authContext";
import { useTodoContext } from "../../contexts/todoContext";

const TodoForm = () => {
  const { data, createData } = useTodoContext();
  const [todo, setTodo] = useState("");
  const { getToken } = useAuthContext();
  const todoRef = useRef(null);

  const onChangeInput = useCallback((e) => setTodo(e.target.value), []);

  const onClickButton = useCallback(async () => {
    if (todo.length < 1) return false;
    const { token } = getToken();
    const result = await createTodo({ token, todo });
    if (result) {
      createData({ item: result });
      setTodo("");
      todoRef.current.focus();
    } else {
      window.alert("오류");
    }
  }, [todo, data, getToken, createData]);

  return (
    <form>
      <input
        data-testid="new-todo-input"
        onChange={onChangeInput}
        value={todo}
        ref={todoRef}
      />
      <button
        data-testid="new-todo-add-button"
        onClick={onClickButton}
        type="button"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
