import { useTodoContext } from "../../contexts/todoContext";

const TodoCount = () => {
  const { allCount, completeCount } = useTodoContext();

  return (
    <>
      <div>{allCount}</div>
      <div>{completeCount}</div>
    </>
  );
};

export default TodoCount;
