import Main from "../../components/atoms/Main";
import Header from "../../components/atoms/Header";
import TodoForm from "../../components/organisms/TodoForm";
import TodoContent from "../../components/templates/TodoContent";
import { TodoContextProvider } from "../../contexts/todoContext";
import { useAuthContext } from "../../contexts/authContext";

const TodoPage = () => {
  const { getToken } = useAuthContext();
  const { token } = getToken();

  return (
    <Main className={"todo"}>
      <Header text={"To Do"} />
      <TodoContextProvider>
        <TodoForm token={token} />
        <TodoContent token={token} />
      </TodoContextProvider>
    </Main>
  );
};
export default TodoPage;
