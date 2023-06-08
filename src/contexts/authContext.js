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

const initState = {
  isSignIn: false,
  email: "",
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

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const userSignIn = useCallback(
    (value) => dispatch({ type: TYPE.SIGN_IN, value }),
    []
  );
  const userSignOut = useCallback(() => dispatch({ type: TYPE.SIGN_OUT }), []);

  const getToken = useCallback(() => {
    const token = localStorage.getItem("access_token");
    const email = localStorage.getItem("email");
    return { token, email };
  }, []);
  const setToken = useCallback(({ token, email }) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("email", email);
  }, []);
  const removeToken = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
  }, []);

  const value = useMemo(
    () => ({
      isSignIn: state.isSignIn,
      email: state.email,
      userSignIn,
      userSignOut,
      getToken,
      setToken,
      removeToken,
    }),
    [
      state.isSignIn,
      state.email,
      userSignIn,
      userSignOut,
      getToken,
      setToken,
      removeToken,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
