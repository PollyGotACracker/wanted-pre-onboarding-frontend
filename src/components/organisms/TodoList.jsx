import "./TodoList.css";
import { useTodoContext } from "../../contexts/todoContext";
import { RiCheckFill } from "react-icons/ri";
import List from "../../components/molecules/List";
import TodoItem from "../../components/organisms/TodoItem";

const TodoList = () => {
  const { data, allCount, completeCount } = useTodoContext();

  return (
    <div className="list-container">
      <div className="count">
        <RiCheckFill />
        <span>{completeCount}</span>
        <span> / </span>
        <span>{allCount}</span>
      </div>
      <List
        data={data}
        id={"id"}
        render={(props) => <TodoItem item={props} />}
      />
    </div>
  );
};

export default TodoList;
