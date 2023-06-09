import { TodoContextProvider } from "../../contexts/todoContext";

import Todo from "./Todo";
import "./TodoPage.css";

const TodoPage = () => {
  return (
    <TodoContextProvider>
      <Todo />
    </TodoContextProvider>
  );
};

export default TodoPage;
