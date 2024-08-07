import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import Signin from "./pages/Signin/Signin";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import SignUp from "./pages/SignUp/SignUp";
import MainNavigationPage from "./pages/MainNavigation/MainNavigation";
import StaffMainNavigation from "./pages/StaffMainNavigation/StaffMainNavigation";
import EventReport from "./pages/Event/EventReport";
import LecturerDashboard from "./pages/LecturerDashboard/LecturerDashboard";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

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
    path: "id",
    element: <AdminDashboard />,
  },
  {
    path: "lec",
    element: <LecturerDashboard />,
  },
  {
    path: "mainNavigation",
    element: store.getState("user") ? <MainNavigationPage /> : <Signin />,
  },
  {
    path: "eventReport",
    element: <EventReport />,
  },
  {
    path: "staffMainNavigation",
    element: <StaffMainNavigation />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
