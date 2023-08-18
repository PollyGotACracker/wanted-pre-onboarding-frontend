import { useTodoContext } from "../contexts/todoContext";

const checkSubmit = (e, value) => {
  const isValid = value.length > 0;
  const isSubmit = e.key === "Enter" || e.keyCode === 13 || e.type === "click";
  return isValid && isSubmit ? true : false;
};

const useTodoForm = () => {
  const { createTodo, createData } = useTodoContext();

  const createTodoItem = async (e, todo) => {
    if (!checkSubmit(e, todo)) return false;
    const result = await createTodo(todo);
    if (result) {
      createData(result);
      return result;
    }
  };

  return {
    createTodoItem,
  };
};

export default useTodoForm;
