import Main from "../../components/atoms/Main";
import Header from "../../components/atoms/Header";
import TodoForm from "../../components/organisms/TodoForm";
import TodoContent from "../../components/templates/TodoContent";
import { TodoContextProvider } from "../../contexts/todoContext";
import HttpClient from "../../services/core";
import TokenStorage from "../../utils/tokenStorage";
import TodoService from "../../services/todo.service";

const TodoPage = () => {
  const tokenStorage = new TokenStorage();
  const httpClient = new HttpClient(tokenStorage);
  const todoService = new TodoService(httpClient);

  return (
    <Main className={"todo"}>
      <Header text={"To Do"} />
      <TodoContextProvider todoService={todoService}>
        <TodoForm />
        <TodoContent />
      </TodoContextProvider>
    </Main>
  );
};

export default TodoPage;
