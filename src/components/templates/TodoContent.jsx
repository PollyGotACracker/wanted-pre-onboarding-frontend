import { Suspense } from "react";
import Spinner from "../../components/atoms/Spinner";
import lazyLoader from "../../utils/lazyLoader";
const TodoList = lazyLoader(() =>
  import("../../components/organisms/TodoList")
);

const TodoContent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <TodoList />
    </Suspense>
  );
};

export default TodoContent;
