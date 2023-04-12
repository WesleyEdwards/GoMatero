import { Navigate, createBrowserRouter } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import CreateAccount from "../components/CreateAccount";
import SignIn from "../components/SignIn";

export const unAuthRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav />,
    children: [
      { path: "home", element: <div>Home</div> },
      { path: "*", element: <Navigate to="home" replace /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "create-account", element: <CreateAccount /> },
    ],
  },
]);

export const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav auth={true} />,
    children: [
      { path: "home", element: <div>Home</div> },
      { path: "*", element: <Navigate to="home" replace /> },
      { path: "dashboard", element: <div>Dashboard</div> },
    ],
  },
]);
