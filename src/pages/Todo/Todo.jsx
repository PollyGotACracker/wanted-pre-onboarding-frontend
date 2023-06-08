import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useAuthContext } from "../../contexts/authContext";
import { getTodos } from "../../services/todo";

const Todo = () => {
  const [todoData, setTodoData] = useState([]);
  const { getToken } = useAuthContext();

  const getData = async () => {
    const { token } = getToken();
    const data = await getTodos({ token });
    setTodoData([...data]);
  };

  useEffect(() => getData, []);

  return (
    <main>
      Todo
      <TodoForm todoData={todoData} setTodoData={setTodoData} />
      {todoData.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </main>
  );
};
export default Todo;
