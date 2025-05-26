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
      <Route path="/mainNavigation" element={user ? <MainNavigationPage /> : <Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
