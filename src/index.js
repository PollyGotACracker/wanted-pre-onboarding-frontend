import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import NavRouterProvider from "./Router";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./contexts/authContext";
import { MenuContextProvider } from "./contexts/menuContext";
import HttpClient from "./services/core";
import AuthService from "./services/auth.service";
import TokenStorage from "./utils/tokenStorage";

const root = ReactDOM.createRoot(document.getElementById("root"));
const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(tokenStorage);
const authService = new AuthService(httpClient, tokenStorage);

root.render(
  <React.StrictMode>
    <AuthContextProvider authService={authService}>
      <MenuContextProvider>
        <NavRouterProvider />
      </MenuContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
