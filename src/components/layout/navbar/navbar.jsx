import React from 'react';
import logo from '../../../assets/Images/logo/logo_white.png';
import '../../../pages/StaffMainNavigation/StaffMainNavigation.css';
import ProfileButton from '../StaffDashboardComponents/ProfileButton';
import { useNavigate } from 'react-router-dom';
import './navbar.css';


const Navbar = ({ setIndex }) => {
  const navigator = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-between staff-navbar">
      <div className='col-auto mx-2'>
        <div className="row">
          <div className="col-auto pe-0">
            <img
              className=""
              style={{ cursor: 'pointer', width: '70px' }}
              src={logo}
              alt="Sky Ticker"
              onClick={() => navigator('/')}
            />
          </div>
          <div className='col-auto d-flex align-items-center ps-0'>
            <p className="Webname">SKY TICKER</p>
          </div>
        </div>
      </div>
      <div className='col-auto'>
        <ProfileButton setIndex={setIndex} />
      </div>
    </div>
  );
};

export default Navbar;
