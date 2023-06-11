import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Nav from "./components/Nav";
import { useAuthContext } from "./contexts/authContext";
import { useMenuContext } from "./contexts/menuContext";

const App = () => {
  const { sidebarState, toggleSidebar } = useMenuContext();
  const { getToken, userSignIn } = useAuthContext();
  const { token, email } = getToken();

  useEffect(() => {
    if (token) userSignIn(email);
  }, [email, token, userSignIn]);

  return (
    <div className="App">
      <Nav token={token} email={email} />
      <Outlet />
      <div className={`blocker ${sidebarState}`} onClick={toggleSidebar}></div>
    </div>
  );
};

export default App;
