import { useEffect, useRef, useState } from "react";
import Checkbox from "../atoms/Checkbox";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import "./TodoItem.css";
import useTodoItem from "../../hooks/useTodoItem";

const TodoItem = ({ item }) => {
  const { value, changeInputValue, resetTodo, updateTodoItem, deleteTodoItem } =
    useTodoItem(item);
  const [isModify, setIsModify] = useState(false);
  const itemRef = useRef(null);
  const todoRef = useRef(null);

  const startModify = () => setIsModify(true);
  const submitModify = async (e) => {
    await updateTodoItem(e);
    setIsModify(false);
  };
  const cancelModify = () => {
    resetTodo();
    setIsModify(false);
  };
  const deleteItem = async () => {
    const result = await deleteTodoItem();
    if (result) itemRef.current.style.pointerEvents = "none";
  };

  useEffect(() => {
    if (isModify) todoRef.current.focus();
  }, [isModify]);

  const TEXT = {
    false: <span>{item.todo}</span>,
    true: (
      <Input
        dataset={"modify-input"}
        className={"full"}
        value={value}
        onChange={changeInputValue}
        refHook={todoRef}
      />
    ),
  };

  const BUTTON = {
    false: {
      firstDataset: "modify-button",
      firstAction: startModify,
      firstText: "수정",
      secondDataset: "delete-button",
      secondAction: deleteItem,
      secondText: "삭제",
    },
    true: {
      firstDataset: "submit-button",
      firstAction: submitModify,
      firstText: "제출",
      secondDataset: "cancel-button",
      secondAction: cancelModify,
      secondText: "취소",
    },
  };

  return (
    <li ref={itemRef}>
      <Checkbox
        checked={item.isCompleted}
        onChange={updateTodoItem}
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
};

export default TodoItem;
