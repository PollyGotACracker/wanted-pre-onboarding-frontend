import { Outlet } from "react-router-dom";
import "./styles/App.css";
import { MenuContextProvider } from "./contexts/menuContext";

const App = () => {
  return (
    <div className="App">
      <MenuContextProvider>
        <Outlet />
      </MenuContextProvider>
    </div>
  );
};

export default App;
