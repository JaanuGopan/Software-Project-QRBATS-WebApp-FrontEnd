import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './config/AuthProvider';
import MainNavigationPage from './pages/MainNavigation/MainNavigation';
import LandingPage from './pages/UserInterface/LandingPage';

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          user?.role === 'ADMIN' ? (
            <MainNavigationPage contentName="AdminDashboard" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin/staff"
        element={
          user?.role === 'ADMIN' ? (
            <MainNavigationPage contentName="StaffDashboard" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin/student"
        element={
          user?.role === 'ADMIN' ? (
            <MainNavigationPage contentName="StudentDashboard" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin/report"
        element={
          user?.role === 'ADMIN' ? (
            <MainNavigationPage contentName="EventReport" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/admin/settings"
        element={
          user?.role === 'ADMIN' ? (
            <MainNavigationPage contentName="Settings" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      {/* Lecturer Routes */}
      <Route
        path="/lecturer/dashboard"
        element={
          user?.role === 'LECTURER' ? (
            <MainNavigationPage contentName="LecturerDashboard" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/lecturer/lectures"
        element={
          user?.role === 'LECTURER' ? (
            <MainNavigationPage contentName="LectureCreationPage" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/lecturer/events"
        element={
          user?.role === 'LECTURER' ? (
            <MainNavigationPage contentName="EventCreationDashboard" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/lecturer/modules"
        element={
          user?.role === 'LECTURER' ? (
            <MainNavigationPage contentName="ModulePage" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/lecturer/reports"
        element={
          user?.role === 'LECTURER' ? (
            <MainNavigationPage contentName="ReportPage" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/lecturer/event-report"
        element={
          user?.role === 'LECTURER' ? (
            <MainNavigationPage contentName="EventReport" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/lecturer/settings"
        element={
          user?.role === 'LECTURER' ? (
            <MainNavigationPage contentName="Settings" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
