import React from 'react';
import logo from '../../../assets/Images/logo/logo_white.png';
import '../../../pages/StaffMainNavigation/StaffMainNavigation.css';
import ProfileButton from './ProfileButton';
import { useNavigate } from 'react-router-dom';

const StaffNavBar = ({ setIndex }) => {
  const navigator = useNavigate();
  return (
    <div className="Staff-Navbar">
      <div className="Staff-Icon">
        <img
          className="Staff-Logo"
          style={{ cursor: 'pointer' }}
          src={logo}
          alt="Sky Ticker"
          onClick={() => navigator('/')}
        />
        <p className="Webname">SKY TICKER</p>
      </div>
      <ProfileButton setIndex={setIndex} />
    </div>
  );
};

export default StaffNavBar;
