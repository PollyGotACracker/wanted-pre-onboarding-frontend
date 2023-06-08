import { TodoContextProvider } from "../../contexts/todoContext";
import { useAuthContext } from "../../contexts/authContext";
// import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { ERROR_AUTH } from "../../constants/error";

const PreTodo = () => {
  const { getToken } = useAuthContext();

  // redirect?

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!getToken()) {
  //       window.alert(ERROR_AUTH.noToken);
  //       navigate("/signin", { replace: true });
  //     }
  //   }, []);

  return <TodoContextProvider>{getToken() && <Outlet />}</TodoContextProvider>;
};

export default PreTodo;
