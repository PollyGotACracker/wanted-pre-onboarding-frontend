import { TodoContextProvider } from "../../contexts/todoContext";
import TodoPage from "./TodoPage";

const WrapTodo = () => {
  return (
    <TodoContextProvider>
      <TodoPage />
    </TodoContextProvider>
  );
};

export default WrapTodo;
