import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import Title from "../../components/atoms/Title";
import TodoCount from "../../components/templates/TodoCount";
import TodoForm from "../../components/templates/TodoForm";
import TodoItem from "../../components/templates/TodoItem";
import { ERROR_TODO } from "../../constants/error";
import { useAuthContext } from "../../contexts/authContext";
import { useTodoContext } from "../../contexts/todoContext";
import { getTodos, createTodo } from "../../services/todo.service";

const Todo = () => {
  const { data, setData, createData } = useTodoContext();
  const { getToken } = useAuthContext();
  const { token } = getToken();
  const [todo, setTodo] = useState("");
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
  }, [todo, getToken, createData]);

  useEffect(
    () => async () => {
      const result = await getTodos({ token });
      if (result) setData({ data: [...result] });
      else window.alert(ERROR_TODO.get);
    },
    [token, getToken, setData]
  );

  const items = useMemo(() => {
    return data.map((item) => <TodoItem key={item.id} item={item} />);
  }, [data]);

  return (
    <main className="Todo">
      <Title text={"To Do"} />
      <TodoCount />
      <TodoForm
        onChangeInput={onChangeInput}
        inputValue={todo}
        inputRef={todoRef}
        onClickButton={onClickButton}
      />
      <ul>{items}</ul>
    </main>
  );
};
export default Todo;
