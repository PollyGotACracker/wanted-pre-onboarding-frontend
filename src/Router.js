import { createBrowserRouter, RouterProvider } from "react-router-dom";
import wrapRedirectRouters from "./utils/wrapRedirectRouters.js";
import { ALERT_AUTH } from "./constants/message.js";
import App from "./App";
import HomePage from "./pages/Home/HomePage";
import SignInPage from "./pages/User/SignInPage";
import SignUpPage from "./pages/User/SignUpPage";
import TodoPage from "./pages/Todo/TodoPage";
import NotFound from "./pages/NotFound";

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
    path: "/todo",
    element: <TodoPage />,
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
      element: <App />,
      children: wrapRedirectRouters(routerData),
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

const NavRouterProvider = () => {
  return <RouterProvider router={NavRouter}></RouterProvider>;
};

export default NavRouterProvider;
