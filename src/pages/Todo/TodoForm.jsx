import { useState, useCallback } from "react";
import { createTodo } from "../../services/todo";
import { useAuthContext } from "../../contexts/authContext";

const TodoForm = ({ todoData, setTodoData }) => {
  const [todo, setTodo] = useState("");
  const { getToken } = useAuthContext();
  const onChangeInput = useCallback((e) => setTodo(e.target.value), []);

  const onClickButton = useCallback(async () => {
    if (todo.length < 1) return false;
    const { token } = getToken();
    const result = await createTodo({ token, todo });
    if (result) {
      setTodoData([...todoData, result]);
    } else {
      window.alert("오류");
    }
  }, [todo]);

  return (
    <form>
      <input
        data-testid="new-todo-input"
        onChange={onChangeInput}
        value={todo}
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
