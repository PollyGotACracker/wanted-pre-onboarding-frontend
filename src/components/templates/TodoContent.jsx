import { memo, useEffect, useState, useCallback } from "react";
import Spinner from "../../components/atoms/Spinner";
import TodoList from "../../components/organisms/TodoList";
import { useTodoContext } from "../../contexts/todoContext";
import { getTodos } from "../../services/todo.service";
import { ERROR_TODO } from "../../constants/message";

const TodoContent = memo(({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setData } = useTodoContext();

  const initData = useCallback(async () => {
    const result = await getTodos({ token });
    if (result) {
      const data = [...result].reverse();
      setData({ data: data });
      setTimeout(() => setIsLoading(false), 500);
    } else {
      window.alert(ERROR_TODO.get);
    }
  }, [setData, token]);

  useEffect(() => {
    initData();
  }, [initData, token, setData]);

  return isLoading ? <Spinner loading={isLoading} /> : <TodoList />;
});

export default TodoContent;
