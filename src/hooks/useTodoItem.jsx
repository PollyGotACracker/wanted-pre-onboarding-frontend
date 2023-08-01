import { useState } from "react";
import { useTodoContext } from "../contexts/todoContext";

const useTodoItem = (item) => {
  const { updateTodo, deleteTodo, updateData, deleteData } = useTodoContext();
  const [todoItem, setTodoItem] = useState({ ...item });

  const changeInputTodo = ({ target }) =>
    setTodoItem({ ...todoItem, todo: target.value });

  const resetTodo = () => {
    setTodoItem({ ...todoItem, todo: item.todo });
  };

  const getModified = (currentTarget) => {
    const isCompleted =
      currentTarget.type === "checkbox"
        ? !todoItem.isCompleted
        : todoItem.isCompleted;
    return { ...todoItem, isCompleted: isCompleted };
  };

  const updateTodoItem = async ({ currentTarget }) => {
    if (todoItem.todo.length === 0) {
      resetTodo();
      return false;
    }
    const modified = getModified(currentTarget);
    const result = await updateTodo(modified);
    if (result) {
      setTodoItem(modified);
      updateData(modified);
    } else resetTodo();
  };

  const deleteTodoItem = async () => {
    const result = await deleteTodo(todoItem.id);
    if (result) {
      deleteData(todoItem.id);
      return result;
    }
  };

  return {
    todoItem,
    changeInputTodo,
    resetTodo,
    updateTodoItem,
    deleteTodoItem,
  };
};

export default useTodoItem;
