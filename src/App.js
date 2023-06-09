import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./styles/App.css";
import Nav from "./components/Nav";
import { useAuthContext } from "./contexts/authContext";

const App = () => {
  const { getToken, userSignIn } = useAuthContext();
  const { token, email } = getToken();

  useEffect(() => {
    if (token) userSignIn(email);
  }, [email, token, userSignIn]);

  return (
    <div className="App">
      <Nav token={token} email={email} />
      <Outlet />
    </div>
  );
};

export default App;
