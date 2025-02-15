import React, { useEffect, useState } from 'react';
import { IoMenu, IoSettings } from 'react-icons/io5';
import { MdOutlineEventNote, MdQrCode } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
import '../../../pages/StaffMainNavigation/StaffMainNavigation.css';
import logo from '../../../assets/Images/logo/logo_white.png';
import { AiFillDashboard } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { TbReport } from 'react-icons/tb';
import { setSideBarIndex, resetSideBarIndex } from '../../../redux/features/mainNavigationSlice';
import './sidebar.css'
import { IoMdSchool } from 'react-icons/io';
import { FaUserTie } from 'react-icons/fa';
import { PiStudentBold } from 'react-icons/pi';
import SideBarButton from './sidebar-button';

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
  }

  const checkScreenWidth = () => {
    setShowSideBar(window.innerWidth >= 576);
  };

  useEffect(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => window.removeEventListener('resize', checkScreenWidth);
  }, []);
  

  return (
    <>
      <div className='row'>
        <div className="col-auto menu-button mt-2" onClick={handleHideSidebar}>
          <IoMenu className="menu-button-icon" size={'30px'} />
        </div>
      </div>
      {showSideBar && (<div className='row h-100 side-bar-container mt-2 z-3'>
        <div className="col">
          <div className='row d-sm-none d-md-flex align-items-center justify-content-center'>
            <div className='col d-flex align-items-center justify-content-center my-4'>
              <img src={logo} className="side-bar-logo" alt="Logo" />
            </div>
          </div>
          {role === 'LECTURER' ? <>
            <div className="row mt-3 mt-sm-5 mt-md-1 justify-content-center my-1">
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
                title={'Lecture'}
                icon={<IoMdSchool/>}
                isOpen={index === 1}
              />
            </div>
            <div className="row justify-content-center my-1">
              <SideBarButton
                handleSidebarMenu={() => handleMenuClick(2)}
                title={'Event'}
                icon={<MdQrCode />}
                isOpen={index === 2}
              />
            </div>
            <div className="row justify-content-center my-1">
              <SideBarButton
                handleSidebarMenu={() => handleMenuClick(3)}
                title={'Module'}
                icon={<MdOutlineEventNote />}
                isOpen={index === 3}
              />
            </div>
            <div className="row justify-content-center my-1">
              <SideBarButton
                handleSidebarMenu={() => handleMenuClick(4)}
                title={'Lecture Report'}
                icon={<TbReport />}
                isOpen={index === 4}
              />
            </div>
            <div className="row justify-content-center my-1">
              <SideBarButton
                handleSidebarMenu={() => handleMenuClick(5)}
                title={'Event Report'}
                icon={<TbReport />}
                isOpen={index === 5}
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
          : role === 'ADMIN' && <>
            <div className="row mt-5 mt-md-1 justify-content-center my-1">
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
          </>}
        </div>
      </div>)}
    </>
  );
};

export default SideBar;
