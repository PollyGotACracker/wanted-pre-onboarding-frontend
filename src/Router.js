import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  App,
  HomePage,
  SignInPage,
  SignUpPage,
  WrapTodo,
  RedirectNoToken,
  RedirectToken,
  NotFound,
} from "./routerComps.js";

const NavRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { path: "", element: <HomePage /> },
        {
          path: "",
          element: <RedirectToken />,
          children: [
            { path: "signin", element: <SignInPage /> },
            { path: "signup", element: <SignUpPage /> },
          ],
        },
        {
          path: "todo",
          element: <RedirectNoToken />,
          children: [{ path: "", element: <WrapTodo /> }],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);
const NavRouterProvider = () => {
  return <RouterProvider router={NavRouter}></RouterProvider>;
};

export default NavRouterProvider;
