import React, { useEffect, useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { IoCalendarOutline, IoLogOut, IoMenu, IoSettings } from 'react-icons/io5';
import { MdOutlineEventNote, MdQrCode } from 'react-icons/md';
import { PiStudentBold } from 'react-icons/pi';
import { TbReport } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import logo from '../../../assets/Images/logo/logo_white.png';
import '../../../pages/StaffMainNavigation/StaffMainNavigation.css';
import { setSideBarIndex } from '../../../redux/features/mainNavigationSlice';
import SideBarButton from './sidebar-button';
import './sidebar.css';

const SideBar = ({ index, setIndex, handleShowLogoutWindow, role }) => {
  const dispatch = useDispatch();
  const [showSideBar, setShowSideBar] = useState(true);

  const handleMenuClick = (menuIndex) => {
    dispatch(setSideBarIndex(menuIndex));
    setIndex(menuIndex);
    checkScreenWidth();
  };

  const handleHideSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  const checkScreenWidth = () => {
    setShowSideBar(window.innerWidth >= 576);
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);

  const renderLecturerMenu = () => (
    <>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(0)}
          title={'Dashboard'}
          icon={<AiFillDashboard />}
          isOpen={index === 0}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(1)}
          title={'Time Table'}
          icon={<IoCalendarOutline />}
          isOpen={index === 1}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(2)}
          title={'Lecture'}
          icon={<IoMdSchool />}
          isOpen={index === 2}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(3)}
          title={'Event'}
          icon={<MdQrCode />}
          isOpen={index === 3}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(4)}
          title={'Module'}
          icon={<MdOutlineEventNote />}
          isOpen={index === 4}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(5)}
          title={'Lecture Report'}
          icon={<TbReport />}
          isOpen={index === 5}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(6)}
          title={'Event Report'}
          icon={<TbReport />}
          isOpen={index === 6}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(7)}
          title={'Calendar'}
          icon={<IoCalendarOutline />}
          isOpen={index === 7}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(8)}
          title={'Settings'}
          icon={<IoSettings />}
          isOpen={index === 8}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={handleShowLogoutWindow}
          title={'Logout'}
          icon={<IoLogOut />}
        />
      </div>
    </>
  );

  const renderAdminMenu = () => (
    <>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(0)}
          title={'Dashboard'}
          icon={<AiFillDashboard />}
          isOpen={index === 0}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(1)}
          title={'Staff'}
          icon={<FaUserTie />}
          isOpen={index === 1}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(2)}
          title={'Student'}
          icon={<PiStudentBold />}
          isOpen={index === 2}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(3)}
          title={'Report'}
          icon={<TbReport />}
          isOpen={index === 3}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(6)}
          title={'Settings'}
          icon={<IoSettings />}
          isOpen={index === 6}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={handleShowLogoutWindow}
          title={'Logout'}
          icon={<IoLogOut />}
        />
      </div>
    </>
  );

  return (
    <>
      <div className="row">
        <div className="col-auto menu-button mt-2" onClick={handleHideSidebar}>
          <IoMenu className="menu-button-icon" size={'30px'} />
        </div>
      </div>
      {showSideBar && (
        <div className="row h-100 side-bar-container mt-2 z-3">
          <div className="col">
            <div className="row d-sm-none d-md-flex align-items-center justify-content-center">
              <div className="col d-flex align-items-center justify-content-center my-4">
                <img src={logo} className="side-bar-logo" alt="Logo" />
              </div>
            </div>
            {role === 'LECTURER' ? renderLecturerMenu() : role === 'ADMIN' && renderAdminMenu()}
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
