import { createBrowserRouter, RouterProvider } from "react-router-dom";
import wrapRedirectRouters from "./utils/wrapRedirectRouters.js";
import { ALERT_AUTH } from "./constants/message.js";

import App from "./App";
import HomePage from "./pages/Home/HomePage";
import SignInPage from "./pages/User/SignInPage";
import SignUpPage from "./pages/User/SignUpPage";
import TodoPage from "./pages/Todo/TodoPage";
import NotFound from "./pages/NotFound";

import TokenStorage from "./utils/tokenStorage.js";
import HttpClient from "./services/core/index.js";
import AuthService from "./services/auth.service.js";
import TodoService from "./services/todo.service.js";

import { AuthContextProvider } from "./contexts/authContext.js";
import { TodoContextProvider } from "./contexts/todoContext.js";

const tokenStorage = new TokenStorage();
const httpClient = new HttpClient(tokenStorage);
const authService = new AuthService(httpClient, tokenStorage);
const todoService = new TodoService(httpClient);

const routerData = [
  { path: "", element: <HomePage />, authCheck: false },
  {
    path: "signin",
    element: <SignInPage />,
    authCheck: true,
    requireAuth: false,
    redirectTo: "/todo",
  },
  {
    path: "signup",
    element: <SignUpPage />,
    authCheck: true,
    requireAuth: false,
    redirectTo: "/todo",
  },
  {
    path: "todo",
    element: (
      <TodoContextProvider todoService={todoService}>
        <TodoPage />
      </TodoContextProvider>
    ),
    authCheck: true,
    requireAuth: true,
    redirectTo: "/signin",
    state: { message: ALERT_AUTH.noToken },
  },
  { path: "*", element: <NotFound /> },
];

const NavRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <App tokenStorage={tokenStorage} />,
      children: wrapRedirectRouters(routerData),
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const NavRouterProvider = () => {
  return (
    <AuthContextProvider authService={authService}>
      <RouterProvider router={NavRouter}></RouterProvider>
    </AuthContextProvider>
  );
};

export default NavRouterProvider;
