import React from 'react';
import LandingPage from './pages/UserInterface/LandingPage';
import MainNavigationPage from './pages/MainNavigation/MainNavigation';
import { selectIsLoggedIn } from './redux/features/userSlice';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
import StaffMainNavigation from './pages/StaffMainNavigation/StaffMainNavigation';

const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/mainNavigation" element={<MainNavigationPage />}>
          <Route path="{:id}" element={<MainNavigationPage />} />
        </Route>
        <Route path="/staffMainNavigation" element={<StaffMainNavigation />} />
      </Routes>
    </Router>
  );
};

export default App;
