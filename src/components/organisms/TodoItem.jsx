import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useTodoContext } from "../../contexts/todoContext";
import Checkbox from "../atoms/Checkbox";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import "./TodoItem.css";

const TodoItem = memo(({ item }) => {
  const { updateTodo, deleteTodo, updateData, deleteData } = useTodoContext();
  const [todoItem, setTodoItem] = useState({ ...item });
  const [isModify, setIsModify] = useState(false);
  const todoRef = useRef(null);
  const itemRef = useRef(null);

  const onChangeInput = useCallback(
    (e) => setTodoItem({ ...todoItem, todo: e.target.value }),
    [todoItem]
  );

  const onClickUpdate = useCallback(
    async (modified) => {
      if (modified.todo.length < 1) {
        setTodoItem({ ...todoItem, todo: item.todo });
        return false;
      }
      const result = await updateTodo(modified);
      if (result) updateData(modified);
    },
    [item.todo, todoItem, updateTodo, updateData]
  );

  const onChangeCheck = useCallback(
    () =>
      setTodoItem((prev) => {
        const modified = { ...todoItem, isCompleted: !prev.isCompleted };
        onClickUpdate(modified);
        return modified;
      }),
    [onClickUpdate, todoItem]
  );

  const onClickDelete = useCallback(async () => {
    const result = await deleteTodo(todoItem.id);
    if (result) {
      itemRef.current.style.pointerEvents = "none";
      await deleteData(todoItem.id);
    }
  }, [deleteTodo, deleteData, todoItem.id]);

  const TEXT = {
    false: <span>{todoItem.todo}</span>,
    true: (
      <Input
        dataset={"modify-input"}
        className={"full"}
        value={todoItem.todo}
        onChange={onChangeInput}
        refHook={todoRef}
      />
    ),
  };

  const BUTTON = {
    false: {
      firstDataset: "modify-button",
      firstAction: () => setIsModify(true),
      firstText: "수정",
      secondDataset: "delete-button",
      secondAction: onClickDelete,
      secondText: "삭제",
    },
    true: {
      firstDataset: "submit-button",
      firstAction: () => {
        onClickUpdate(todoItem);
        setIsModify(false);
      },
      firstText: "제출",
      secondDataset: "cancel-button",
      secondAction: () => {
        setTodoItem({ ...todoItem, todo: item.todo });
        setIsModify(false);
      },
      secondText: "취소",
    },
  };

  useEffect(() => {
    if (isModify) todoRef.current.focus();
  }, [isModify]);

  return (
    <li ref={itemRef}>
      <Checkbox
        checked={todoItem.isCompleted}
        onChange={onChangeCheck}
        text={TEXT[isModify]}
      />
      <Button
        dataset={BUTTON[isModify].firstDataset}
        onClick={BUTTON[isModify].firstAction}
        text={BUTTON[isModify].firstText}
      />
      <Button
        dataset={BUTTON[isModify].secondDataset}
        onClick={BUTTON[isModify].secondAction}
        text={BUTTON[isModify].secondText}
      />
    </li>
  );
});

export default TodoItem;
