import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./components/pages/Signin/Signin";
import AdminDashboard from "./components/pages/AdminDashboard/AdminDashboard";
import SignUp from "./components/pages/SignUp/SignUp";
import MainNavigationPage from "./components/pages/MainNavigation/MainNavigation";
import EventCreation from "./components/pages/Event/EventCreation/EventCreation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signin",
    element: <Signin />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "id",
    element: <AdminDashboard />,
  },
  {
    path: "mainNavigation",
    element: <MainNavigationPage />,
  },
  {
    path: "eventCreation",
    element: <EventCreation />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();