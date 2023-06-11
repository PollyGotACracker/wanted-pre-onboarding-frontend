import "./TodoList.css";
import { useTodoContext } from "../../contexts/todoContext";
import { RiCheckFill } from "react-icons/ri";
import ListContainer from "../../components/modules/ListContainer";
import TodoItem from "../../components/templates/TodoItem";

const TodoList = () => {
  const { data } = useTodoContext();
  const { allCount, completeCount } = useTodoContext();

  return (
    <div className="list">
      <div className="count">
        <RiCheckFill />
        <span>{completeCount}</span>
        <span> / </span>
        <span>{allCount}</span>
      </div>
      <ListContainer
        data={data}
        id={"id"}
        render={(props) => <TodoItem item={props} />}
      />
    </div>
  );
};

export default TodoList;
