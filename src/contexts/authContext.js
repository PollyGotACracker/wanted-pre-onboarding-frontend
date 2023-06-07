import {
  useReducer,
  useMemo,
  createContext,
  useContext,
  useCallback,
} from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const TYPE = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case TYPE.SIGN_IN: {
      return { ...state, isSignIn: true, email: action.value };
    }
    case TYPE.SIGN_OUT: {
      return { ...state, isSignIn: false, email: "" };
    }
    default:
      return state;
  }
};

const initState = {
  isSignIn: false,
  email: "",
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const getToken = useCallback(
    (value) => dispatch({ type: TYPE.SIGN_IN, value }),
    []
  );
  const removeToken = useCallback(() => dispatch({ type: TYPE.SIGN_OUT }), []);

  const value = useMemo(
    () => ({
      isSignIn: state.isSignIn,
      email: state.email,
      getToken,
      removeToken,
    }),
    [state.isSignIn, state.email, getToken, removeToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
