// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Overview from "../pages/Dashboard/components/Overview/index";
import Profile from "../pages/Dashboard/components/Profile/index";
import PrivateLayout from "../Layout/Privatelayout";
import OperationsManuals from "../pages/Operationsmanuals/OperationsManuals";
import ManualsDocs from "../pages/ManualsDocs/ManualsDocs";
import NotFound from "../pages/NotFound";

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
      // { path: "profile", element: <Profile /> },
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
  {
    path:"/operations/manuals",
    element:(
      <PrivateRoute>
     <PrivateLayout />
      </PrivateRoute>
    ),
    children:[
      {index:true, element: <OperationsManuals />}
    ]
  },
  {
    path : "/operations/manuals/docs",
    element :(
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children :[
      {index:true , element : <ManualsDocs />}
    ]
  },





   // ✅ Catch-all route for 404
  {
    path: "*",
    element: <NotFound />,
  },
]);
