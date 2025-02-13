import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/UserInterface/LandingPage";
import MainNavigationPage from "./pages/MainNavigation/MainNavigation";
import Signin from "./pages/Signin/Signin";
import StaffMainNavigation from "./pages/StaffMainNavigation/StaffMainNavigation";
import { AuthContext } from "./config/AuthProvider";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={user ? <Navigate to="/mainNavigation"/> : <Signin />} />
      <Route path="/mainNavigation" element={user ? <MainNavigationPage /> : <Navigate to="/signin" />} />
      <Route path="/staffMainNavigation" element={user ? <StaffMainNavigation /> : <Navigate to="/signin" />} />
    </Routes>
  );
};

export default AppRoutes;
