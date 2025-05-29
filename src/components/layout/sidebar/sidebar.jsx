import { useEffect, useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { IoLogOut, IoMenu, IoSettings } from 'react-icons/io5';
import { MdOutlineEventNote, MdQrCode } from 'react-icons/md';
import { PiStudentBold } from 'react-icons/pi';
import { TbReport } from 'react-icons/tb';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../../assets/Images/logo/logo_white.png';
import '../../../pages/StaffMainNavigation/StaffMainNavigation.css';
import SideBarButton from './sidebar-button';
import './sidebar.css';

const SideBar = ({ handleShowLogoutWindow, role }) => {
  const [showSideBar, setShowSideBar] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (menuIndex) => {
    if (window.innerWidth <= 576) {
      setShowSideBar(false);
    }

    if (role === 'ADMIN') {
      switch (menuIndex) {
        case 0:
          navigate('/admin/dashboard');
          break;
        case 1:
          navigate('/admin/staff');
          break;
        case 2:
          navigate('/admin/student');
          break;
        case 3:
          navigate('/admin/report');
          break;
        case 6:
          navigate('/admin/settings');
          break;
        default:
          break;
      }
    } else if (role === 'LECTURER') {
      switch (menuIndex) {
        case 0:
          navigate('/lecturer/dashboard');
          break;
        case 1:
          navigate('/lecturer/lectures');
          break;
        case 2:
          navigate('/lecturer/events');
          break;
        case 3:
          navigate('/lecturer/modules');
          break;
        case 4:
          navigate('/lecturer/reports');
          break;
        case 5:
          navigate('/lecturer/event-report');
          break;
        case 6:
          navigate('/lecturer/settings');
          break;
        default:
          break;
      }
    }
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

  // Helper to check if current path matches
  const isActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  const renderLecturerMenu = () => (
    <>
      <div className="row justify-content-center my-1 mt-sm-5 mt-md-0">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(0)}
          title={'Dashboard'}
          icon={<AiFillDashboard />}
          isOpen={isActive(['/lecturer/dashboard'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(1)}
          title={'Lecture'}
          icon={<IoMdSchool />}
          isOpen={isActive(['/lecturer/lectures'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(2)}
          title={'Event'}
          icon={<MdQrCode />}
          isOpen={isActive(['/lecturer/events'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(3)}
          title={'Module'}
          icon={<MdOutlineEventNote />}
          isOpen={isActive(['/lecturer/modules'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(4)}
          title={'Lecture Report'}
          icon={<TbReport />}
          isOpen={isActive(['/lecturer/reports'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(5)}
          title={'Event Report'}
          icon={<TbReport />}
          isOpen={isActive(['/lecturer/event-report'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(6)}
          title={'Settings'}
          icon={<IoSettings />}
          isOpen={isActive(['/lecturer/settings'])}
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
      <div className="row justify-content-center my-1 mt-sm-5 mt-md-0">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(0)}
          title={'Dashboard'}
          icon={<AiFillDashboard />}
          isOpen={isActive(['/admin/dashboard'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(1)}
          title={'Staff'}
          icon={<FaUserTie />}
          isOpen={isActive(['/admin/staff'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(2)}
          title={'Student'}
          icon={<PiStudentBold />}
          isOpen={isActive(['/admin/student'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(3)}
          title={'Report'}
          icon={<TbReport />}
          isOpen={isActive(['/admin/report'])}
        />
      </div>
      <div className="row justify-content-center my-1">
        <SideBarButton
          handleSidebarMenu={() => handleMenuClick(6)}
          title={'Settings'}
          icon={<IoSettings />}
          isOpen={isActive(['/admin/settings'])}
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
        <div className="row h-100 side-bar-container mt-2" style={{ zIndex: '1000' }}>
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
