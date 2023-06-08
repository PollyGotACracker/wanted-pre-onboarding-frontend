import {
  useReducer,
  useMemo,
  createContext,
  useContext,
  useCallback,
} from "react";

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

const initState = [];

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const value = useMemo(() => ({}), []);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
