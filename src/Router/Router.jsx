import { createBrowserRouter, RouterProvider } from "react-router";
import Root from "../Root/Root";
import AuthRoot from "../Root/AuthRoot";
import LogIn from "../Pages/Authentication/LogIn";
import Register from "../Pages/Authentication/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: AuthRoot,
    children: [
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
      },
    ],
  },
]);
