import { TodoContextProvider } from "../../contexts/todoContext";
import Todo from "./Todo";

const TodoPage = () => {
  return (
    <TodoContextProvider>
      <Todo />
    </TodoContextProvider>
  );
};

export default TodoPage;
