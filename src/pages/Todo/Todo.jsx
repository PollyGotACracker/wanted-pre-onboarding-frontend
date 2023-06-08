import { useEffect, useLayoutEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useAuthContext } from "../../contexts/authContext";
import { getTodos } from "../../services/todo.service";
import { ERROR_AUTH } from "../../constants/error";

const Todo = () => {
  const [todoData, setTodoData] = useState([]);
  const { getToken } = useAuthContext();
  const { token } = getToken();

  const getData = async () => {
    const data = await getTodos({ token });
    if (data) setTodoData([...data]);
  };

  useEffect(() => {
    if (!token) {
      window.alert(ERROR_AUTH.noToken);
      window.location.replace("/signin");
    }
    if (token) getData();
  }, []);

  return (
    <main>
      Todo
      <TodoForm todoData={todoData} setTodoData={setTodoData} />
      {todoData.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          todoData={todoData}
          setTodoData={setTodoData}
        />
      ))}
    </main>
  );
};
export default Todo;
