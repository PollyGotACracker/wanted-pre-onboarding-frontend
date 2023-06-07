const TodoModify = () => {
  return (
    <li>
      <form>
        <label>
          <input type="checkbox" />
        </label>
        <input data-testid="modify-input" />
        <button data-testid="submit-button">제출</button>
        <button data-testid="cancel-button">취소</button>
      </form>
    </li>
  );
};

export default TodoModify;
