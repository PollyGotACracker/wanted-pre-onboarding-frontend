import { createContext, useContext, useCallback, useState } from "react";
import NavBar from "../components/organisms/NavBar";

const MenuContext = createContext();

export const useMenuContext = () => {
  return useContext(MenuContext);
};

export const MenuContextProvider = ({ children }) => {
  const [sidebarState, setSidebarState] = useState("");

  const toggleSidebar = useCallback(
    () => setSidebarState(sidebarState === "" ? "active" : ""),
    [sidebarState]
  );

  const value = {
    sidebarState,
    setSidebarState,
    toggleSidebar,
  };

  return (
    <MenuContext.Provider value={value}>
      <NavBar />
      {children}
      <div className={`blocker ${sidebarState}`} onClick={toggleSidebar}></div>
    </MenuContext.Provider>
  );
};
