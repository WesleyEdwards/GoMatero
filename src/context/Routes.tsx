import { Navigate, createBrowserRouter } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import CreateAccount from "../components/CreateAccount";
import SignIn from "../components/SignIn";
import Map from "../components/Map";
import LandingPage from "../components/LandingPage";
import { Dashboard } from "../components/Dashboard";

export const unAuthRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav />,
    children: [
      { path: "home", element: <LandingPage /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "create-account", element: <CreateAccount /> },
      { path: "*", element: <Navigate to="home" replace /> },
    ],
  },
]);

export const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav auth={true} />,
    children: [
      { path: "home", element: <Map /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <div>Profile</div> },
      { path: "*", element: <Navigate to="home" replace /> },
    ],
  },
]);
