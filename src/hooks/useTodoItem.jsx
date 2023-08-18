import { useTodoContext } from "../contexts/todoContext";
import useInput from "./useInput";

const useTodoItem = (item) => {
  const { updateTodo, deleteTodo, updateData, deleteData } = useTodoContext();
  const { value, setValue, changeInputValue } = useInput(item.todo);

  const resetTodo = () => setValue(item.todo);

  const updateTodoItem = async ({ target }) => {
    if (value.length === 0) {
      resetTodo();
      return false;
    }
    // target 이 checkbox 일 때 checked 값, 아니라면 item.isCompleted
    const modified = {
      ...item,
      todo: value ?? item.todo,
      isCompleted: target.checked ?? item.isCompleted,
    };
    const result = await updateTodo(modified);
    if (result) {
      updateData(modified);
    } else resetTodo();
  };

  const deleteTodoItem = async () => {
    const result = await deleteTodo(item.id);
    if (result) {
      deleteData(item.id);
      return result;
    }
  };

  return {
    value,
    changeInputValue,
    resetTodo,
    updateTodoItem,
    deleteTodoItem,
  };
};

export default useTodoItem;
