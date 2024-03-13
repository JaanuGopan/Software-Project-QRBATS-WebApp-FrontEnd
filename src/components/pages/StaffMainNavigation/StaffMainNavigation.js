import React from 'react';
import StaffNavBar from '../../layout/StaffDashboardComponents/StaffSideBar';
import StaffSideBar from '../../layout/StaffDashboardComponents/StaffSideBar';

const StaffMainNavigation = () => {
  return (
    <div className='staff-Main'>
        <StaffNavBar/>
      <div className='staff-Submain'>
        <StaffSideBar/>
        <div className='staff-SubPage'>
            SubPages
        </div>
      </div>
    </div>
  );
}

export default StaffMainNavigation;