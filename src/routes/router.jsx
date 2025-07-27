// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Overview from "../pages/Dashboard/components/Overview/index";
import Profile from "../pages/Dashboard/components/Profile/index";
import PrivateLayout from "../Layout/Privatelayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      //   { path: "overview", element: <Overview /> },
      // add more dashboard sub-routes here
    ],
  },
  {
    path: "/overview",
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> }, // this renders on /overview
    ],
  },
]);
