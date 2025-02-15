import React from 'react';
import './sidebar-button.css'

const SideBarButton = ({ title, icon, handleSidebarMenu, isOpen }) => {
  return (
    <div className={`row w-100`}>
      <div className={`col side-bar-button ${isOpen ? 'active' : ''}`} onClick={handleSidebarMenu}>
        <div className='row align-items-center justify-content-start my-2'>
          <div className='col-auto me-3 me-md-0 side-bar-button-icon-container'>
            {icon}
          </div>
          <div className='col-auto d-sm-none d-md-flex fs-5'>
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarButton;
