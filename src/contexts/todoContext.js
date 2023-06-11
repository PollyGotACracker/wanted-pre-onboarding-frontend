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

const initState = { data: [], allCount: "", completeCount: "" };

const TYPE = {
  SET: "SET",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case TYPE.SET: {
      const _completeCount = action.data.filter(
        (item) => item.isCompleted === true
      );
      return {
        ...state,
        data: [...action.data],
        allCount: action.data.length,
        completeCount: _completeCount.length,
      };
    }

    case TYPE.CREATE: {
      const _data = [action.item, ...state.data];
      return {
        ...state,
        data: [..._data],
        allCount: state.allCount + 1,
      };
    }

    case TYPE.UPDATE: {
      const _data = state.data.map((item) =>
        item.id === action.item.id ? action.item : item
      );
      const _completeCount = _data.filter((item) => item.isCompleted === true);
      return {
        ...state,
        data: [..._data],
        completeCount: _completeCount.length,
      };
    }

    case TYPE.DELETE: {
      const _data = state.data.filter((item) => item.id !== action.id);
      const _completeCount = _data.filter((item) => item.isCompleted === true);
      return {
        ...state,
        data: [..._data],
        allCount: state.allCount - 1,
        completeCount: _completeCount.length,
      };
    }

    default:
      return state;
  }
};

export const TodoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const setData = useCallback(
    ({ data }) => dispatch({ type: TYPE.SET, data }),
    []
  );
  const createData = useCallback(
    ({ item }) => dispatch({ type: TYPE.CREATE, item }),
    []
  );
  const updateData = useCallback(
    ({ item }) => dispatch({ type: TYPE.UPDATE, item }),
    []
  );
  const deleteData = useCallback(
    ({ id }) => dispatch({ type: TYPE.DELETE, id }),
    []
  );

  const value = useMemo(
    () => ({
      data: state.data,
      allCount: state.allCount,
      completeCount: state.completeCount,
      setData,
      createData,
      updateData,
      deleteData,
    }),
    [
      state.data,
      state.allCount,
      state.completeCount,
      setData,
      createData,
      updateData,
      deleteData,
    ]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
