import React from 'react';
import './StaffMainNavigation.css'
import StaffNavBar from '../../layout/StaffDashboardComponents/StaffNavBar';
import StaffSideBar from '../../layout/StaffDashboardComponents/StaffSideBar';

const StaffMainNavigation = () => {
  return (
    <div className='staff-Main'>
      <StaffNavBar/>
      <div class="staff-Submain">
        <StaffSideBar/>
        <div>
          SubPage
        </div>
      </div>
    </div>
  );
}

export default StaffMainNavigation;