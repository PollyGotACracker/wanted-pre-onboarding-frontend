import {
  useMemo,
  createContext,
  useContext,
  useCallback,
  useState,
} from "react";

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

  const value = useMemo(
    () => ({
      sidebarState,
      setSidebarState,
      toggleSidebar,
    }),
    [sidebarState, setSidebarState, toggleSidebar]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
