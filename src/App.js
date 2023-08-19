import { Outlet } from "react-router-dom";
import "./styles/App.css";
import { MenuContextProvider } from "./contexts/menuContext";

const App = ({ tokenStorage }) => {
  return (
    <div className="App">
      <MenuContextProvider tokenStorage={tokenStorage}>
        <Outlet />
      </MenuContextProvider>
    </div>
  );
};

export default App;
