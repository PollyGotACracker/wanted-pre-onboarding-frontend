import { memo, useState } from "react";
import { useAuthContext } from "../../contexts/authContext";
import { updateTodo, deleteTodo } from "../../services/todo.service";
import { ERROR_TODO } from "../../constants/error";
import { useTodoContext } from "../../contexts/todoContext";

const TodoItem = memo(({ item }) => {
  const { updateData, deleteData } = useTodoContext();
  const [todoItem, setTodoItem] = useState({ ...item });
  const [isModify, setIsModify] = useState(false);
  const { getToken } = useAuthContext();
  const { token } = getToken();

  const onChangeCheck = () =>
    setTodoItem((prev) => {
      const changed = { ...todoItem, isCompleted: !prev.isCompleted };
      onClickUpdate({ item: changed });
      return changed;
    });

  const onChangeInput = (e) =>
    setTodoItem({ ...todoItem, todo: e.target.value });

  const onClickUpdate = async ({ item }) => {
    const result = await updateTodo({ token, item });
    if (!result) window.alert(ERROR_TODO.update);
    else updateData({ item });
  };

  const onClickDelete = async () => {
    const result = await deleteTodo({ token, id: todoItem.id });
    if (result) {
      deleteData({ id: todoItem.id });
    } else window.alert(ERROR_TODO.delete);
  };

  const TEXT = {
    false: <span>{todoItem.todo}</span>,
    true: (
      <input
        data-testid="modify-input"
        value={todoItem.todo}
        onChange={onChangeInput}
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
        onClickUpdate({ item: todoItem });
        setIsModify(false);
      },
      firstText: "제출",
      secondDataset: "cancel-button",
      secondAction: () => setIsModify(false),
      secondText: "취소",
    },
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todoItem.isCompleted}
          onChange={onChangeCheck}
        />
        {TEXT[isModify]}
      </label>
      <button
        data-testid={BUTTON[isModify].firstDataset}
        onClick={BUTTON[isModify].firstAction}
      >
        {BUTTON[isModify].firstText}
      </button>
      <button
        data-testid={BUTTON[isModify].secondDataset}
        onClick={BUTTON[isModify].secondAction}
      >
        {BUTTON[isModify].secondText}
      </button>
    </li>
  );
});

export default TodoItem;
