import Main from "../../components/atoms/Main";
import Headline from "../../components/atoms/Headline";
import TodoForm from "../../components/organisms/TodoForm";
import TodoContent from "../../components/templates/TodoContent";

const TodoPage = () => {
  return (
    <Main className={"todo"}>
      <Headline text={"To Do"} />
      <TodoForm />
      <TodoContent />
    </Main>
  );
};

export default TodoPage;
