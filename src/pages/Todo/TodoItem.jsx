import { memo } from "react";

const TodoItem = memo(({ item }) => {
  const { id, todo, isCompleted } = item;
  return (
    <li>
      <label>
        <input type="checkbox" checked={isCompleted} />
        <span>{todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button">삭제</button>
    </li>
  );
});

export default TodoItem;
