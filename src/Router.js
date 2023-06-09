import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  App,
  Home,
  SignIn,
  SignUp,
  TodoPage,
  Private,
  NotFound,
} from "./routerComps.js";

const NavRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "signin",
        element: <SignIn />,
      },
      { path: "signup", element: <SignUp /> },
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
