import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/app/store";
// import pages
import Signin from "./components/pages/Signin/Signin";
import AdminDashboard from "./components/pages/AdminDashboard/AdminDashboard";
import SignUp from "./components/pages/SignUp/SignUp";
import MainNavigationPage from "./components/pages/MainNavigation/MainNavigation";
import EventCreation from "./components/pages/Event/EventCreation/EventCreation";
import StaffMainNavigation from "./components/pages/StaffMainNavigation/StaffMainNavigation";

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
    element: store.getState().user ? <MainNavigationPage /> : <Signin />,
  },
  {
    path: "eventCreation",
    element: <EventCreation />,
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
