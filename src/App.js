import { useLayoutEffect } from "react";
import { useAuthContext } from "./contexts/authContext";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Nav from "./components/Nav";

const App = () => {
  const { isSignIn, getToken } = useAuthContext();

  useLayoutEffect(() => {
    const token = localStorage.getItem("access_token");
    const email = localStorage.getItem("email");
    if (token) getToken(email);
  }, [isSignIn, getToken]);

  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  );
};

export default App;
