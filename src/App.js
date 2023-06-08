import { useLayoutEffect } from "react";
import { useAuthContext } from "./contexts/authContext";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Nav from "./components/Nav";

const App = () => {
  const { isSignIn, getToken, userSignIn } = useAuthContext();

  useLayoutEffect(() => {
    const { token, email } = getToken();
    if (token) userSignIn(email);
  }, [isSignIn, getToken, userSignIn]);

  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  );
};

export default App;
