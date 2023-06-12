import { useEffect, useState } from "react";
import Main from "../../components/atoms/Main";
import TodoContent from "../../components/templates/TodoContent";
import { useAuthContext } from "../../contexts/authContext";
import { useTodoContext } from "../../contexts/todoContext";
import { getTodos } from "../../services/todo.service";
import { ERROR_TODO } from "../../constants/message";

const TodoPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { setData } = useTodoContext();
  const { getToken } = useAuthContext();
  const { token } = getToken();

  useEffect(
    () => async () => {
      const result = await getTodos({ token });
      if (result) {
        const data = [...result].reverse();
        setData({ data: data });
        setTimeout(() => setIsLoading(false), 500);
      } else {
        window.alert(ERROR_TODO.get);
      }
    },
    [token, getToken, setData]
  );

  return (
    <Main className={"todo"}>
      <TodoContent isLoading={isLoading} token={token} />
    </Main>
  );
};
export default TodoPage;
