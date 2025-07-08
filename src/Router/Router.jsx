import { createBrowserRouter, } from "react-router";
import Root from "../Root/Root";
import AuthRoot from "../Root/AuthRoot";
import LogIn from "../Pages/Authentication/LogIn";
import Register from "../Pages/Authentication/Register";
import Home from "../Pages/Home/Home";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    Component: AuthRoot,
    children: [
      {
        path: "/register",
        Component: Register,
      },
      { path: "/login", Component: LogIn },
    ],
  },
]);
