import { Outlet } from "react-router-dom";
import "./styles/App.css";
import NavBar from "./components/organisms/NavBar";
import { useMenuContext } from "./contexts/menuContext";

const App = () => {
  const { sidebarState, toggleSidebar } = useMenuContext();

  return (
    <div className="App">
      <NavBar />
      <Outlet />
      <div className={`blocker ${sidebarState}`} onClick={toggleSidebar}></div>
    </div>
  );
};

export default App;
