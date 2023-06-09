import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  App,
  HomePage,
  SignInPage,
  SignUpPage,
  TodoPage,
  Private,
  NotFound,
} from "./routerComps.js";

const NavRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "signin",
        element: <SignInPage />,
      },
      { path: "signup", element: <SignUpPage /> },
      {
        path: "todo",
        element: <Private />,
        children: [{ path: "", element: <TodoPage /> }],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
const NavRouterProvider = () => {
  return <RouterProvider router={NavRouter}></RouterProvider>;
};

export default NavRouterProvider;
