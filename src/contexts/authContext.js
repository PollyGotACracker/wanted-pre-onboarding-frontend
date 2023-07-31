import { createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};


export const AuthContextProvider = ({ children, authService }) => {
  const signIn = authService.signIn.bind(authService);
  const signUp = authService.signUp.bind(authService);
  const signOut = authService.signOut.bind(authService);

  const value = {
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
