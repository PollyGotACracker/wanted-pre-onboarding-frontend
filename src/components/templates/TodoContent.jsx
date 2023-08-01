import Spinner from "../../components/atoms/Spinner";
import TodoList from "../../components/organisms/TodoList";
import useTodoInit from "../../hooks/useTodoInit";

const TodoContent = () => {
  const { isLoading } = useTodoInit();

  return isLoading ? <Spinner loading={isLoading} /> : <TodoList />;
};

export default TodoContent;
