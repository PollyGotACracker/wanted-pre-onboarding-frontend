import Spinner from "../../components/atoms/Spinner";
import TodoList from "../../components/organisms/TodoList";
import useTodo from "../../hooks/useTodo";

const TodoContent = () => {
  const { isLoading } = useTodo();

  return isLoading ? <Spinner loading={isLoading} /> : <TodoList />;
};

export default TodoContent;
