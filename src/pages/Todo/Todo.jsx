import { useEffect, useState, useCallback, useRef } from "react";
import Header from "../../components/atoms/Header";
import ListContainer from "../../components/modules/ListContainer";
import TodoCount from "../../components/templates/TodoCount";
import TodoForm from "../../components/templates/TodoForm";
import TodoItem from "../../components/templates/TodoItem";
import { ERROR_TODO } from "../../constants/error";
import { useAuthContext } from "../../contexts/authContext";
import { useTodoContext } from "../../contexts/todoContext";
import { getTodos, createTodo } from "../../services/todo.service";

const Todo = () => {
  const { data, setData, createData } = useTodoContext();
  const { getToken } = useAuthContext();
  const { token } = getToken();
  const [todo, setTodo] = useState("");
  const todoRef = useRef(null);

  const onChangeInput = useCallback(({ target }) => setTodo(target.value), []);

  const onKeyDownClickCreate = useCallback(
    async (e) => {
      if (todo.length < 1) return false;
      if (e.key === "Enter" || e.keyCode === 13 || e.type === "click") {
        const result = await createTodo({ token, todo });
        if (result) {
          createData({ item: result });
          setTodo("");
          todoRef.current.focus();
        } else {
          window.alert(ERROR_TODO.create);
        }
      }
    },
    [todo, token, createData]
  );

  useEffect(
    () => async () => {
      const result = await getTodos({ token });
      if (result) {
        const data = [...result].reverse();
        setData({ data: data });
      } else window.alert(ERROR_TODO.get);
    },
    [token, getToken, setData]
  );

  return (
    <main className="Todo">
      <Header text={"To Do"} />
      <TodoForm
        onChangeInput={onChangeInput}
        inputValue={todo}
        inputRef={todoRef}
        handler={onKeyDownClickCreate}
      />
      <TodoCount />
      <ListContainer
        data={data}
        id={"id"}
        render={(props) => <TodoItem item={props} />}
      />
    </main>
  );
};
export default Todo;
