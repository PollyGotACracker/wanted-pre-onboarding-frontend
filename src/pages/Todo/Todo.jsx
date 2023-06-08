import { useEffect, useMemo } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useAuthContext } from "../../contexts/authContext";
import { getTodos } from "../../services/todo.service";
import { useTodoContext } from "../../contexts/todoContext";
import { ERROR_TODO } from "../../constants/error";
import TodoCount from "./TodoCount";

const Todo = () => {
  const { data, setData } = useTodoContext();
  const { getToken } = useAuthContext();

  useEffect(
    () => async () => {
      const { token } = getToken();
      const data = await getTodos({ token });
      if (data) setData({ data: [...data] });
      else window.alert(ERROR_TODO.get);
    },
    [getToken, setData]
  );

  const items = useMemo(() => {
    return data.map((item) => <TodoItem key={item.id} item={item} />);
  }, [data]);

  return (
    <main>
      Todo
      <TodoCount />
      <TodoForm />
      {items}
    </main>
  );
};
export default Todo;
