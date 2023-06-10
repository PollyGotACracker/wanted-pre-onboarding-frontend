import "./TodoCount.css";
import { useTodoContext } from "../../contexts/todoContext";
import { RiCheckFill } from "react-icons/ri";

const TodoCount = () => {
  const { allCount, completeCount } = useTodoContext();

  return (
    <div className="Todo Count">
      <RiCheckFill />
      <span>{completeCount}</span>
      <span> / </span>
      <span>{allCount}</span>
    </div>
  );
};

export default TodoCount;
