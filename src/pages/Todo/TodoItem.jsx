const TodoItem = () => {
  return (
    <li>
      <label>
        <input type="checkbox" />
        <span>TODO</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button">삭제</button>
    </li>
  );
};

export default TodoItem;
