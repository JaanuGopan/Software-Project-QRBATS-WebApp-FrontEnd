import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LocationService from '../../api/services/LocationService';
import Navbar from '../../components/layout/navbar/navbar';
import SideBar from '../../components/layout/sidebar/sidebar';
import { AuthContext } from '../../config/AuthProvider';
import { setLocationList } from '../../redux/features/locationListSlice';
import CalendarPage from '../calendar-page/calender-page';
import AdminDashboard from '../dashboard/AdminDashboard/AdminDashboard';
import EventCreationDashboard from '../dashboard/LecturerDashboard/even-creation-dashboard';
import LecturerDashboard from '../dashboard/LecturerDashboard/LecturerDashboard';
import EventReport from '../Event/EventReport';
import LectureCreationPage from '../LactureCreation/LectureCreationPage';
import LogoutConfirmation from '../LogoutPage/LogoutConfirmation';
import ModulePage from '../Module/ModulePage';
import ReportPage from '../ReportPage/ReportPage';
import Setting from '../Setting/Setting';
import StaffDashboard from '../Staff/StaffDashboard';
import StudentDashboard from '../Student/StudentDashboard';
import Timetable from '../timetable/timetable';
import './MainNavigation.css';

const MainNavigationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sideBarIndex = localStorage.getItem('sideBarIndex');
  const { user, logout } = useContext(AuthContext);
  const { role } = user || {};

  const [venuesList, setVenuesList] = useState([]);
  const [openMenu, setOpenMenu] = useState(0);
  const [handleShowLogoutWindow, setHandleShowLogoutWindow] = useState(false);

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  const handleLogoutClick = () => {
    logout();
  };

  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
    handleGetLocationNameList();
    if (sideBarIndex) {
      setOpenMenu(parseInt(sideBarIndex));
    } else {
      handleNavigate(0);
    }
  }, [user, navigate]);

  useEffect(() => {
    LocationService.getAllLocationNames().then((res) => {
      dispatch(setLocationList(res));
    });
  }, [dispatch]);

  const [isHidden, setIsHidden] = useState(false);
  const handleShow = () => {
    setIsHidden(!isHidden);
  };
  const handleClose = () => {
    setIsHidden(true);
  };

  const renderContent = () => {
    const lecturerMenu = [
      <LecturerDashboard />,
      <Timetable />,
      <LectureCreationPage />,
      <EventCreationDashboard />,
      <ModulePage />,
      <ReportPage />,
      <EventReport />,
      <CalendarPage />,
      <Setting />,
    ];

    const adminMenu = [
      <AdminDashboard />,
      <StaffDashboard />,
      <StudentDashboard />,
      <EventReport />,
      null,
      null,
      <Setting />,
    ];

    if (role === 'LECTURER') {
      return lecturerMenu[openMenu];
    } else if (role === 'ADMIN') {
      return adminMenu[openMenu];
    }
    return null;
  };

  const handleNavigate = (index) => {
    setOpenMenu(index);
    localStorage.removeItem('sideBarIndex');
    localStorage.setItem('sideBarIndex', index);
  };

  return (
    <div className="container-fluid pe-0 main-navigation-container">
      <div className="row h-100">
        <div className="col position-fixed">
          <div className="row">
            <Navbar setIndex={handleNavigate} />
          </div>
          <div className="row w-100 h-100 flex-nowrap">
            <div className="col-auto">
              <SideBar
                handleClose={handleClose}
                index={openMenu}
                setIndex={handleNavigate}
                handleShowLogoutWindow={() => {
                  setHandleShowLogoutWindow(true);
                }}
                role={role}
              />
            </div>
            <div className="col main-navigation-content-container">{renderContent()}</div>
            {handleShowLogoutWindow && (
              <div className="logout-window">
                <LogoutConfirmation
                  handleCloseLogoutWindow={() => {
                    setHandleShowLogoutWindow(false);
                  }}
                  handleLogout={handleLogoutClick}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigationPage;
