import React, { useState, useEffect, useContext } from 'react';
import './MainNavigation.css';
import '../StaffMainNavigation/StaffMainNavigation.css';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import StaffNavBar from '../../components/layout/StaffDashboardComponents/StaffNavBar';
import AdminSideBar from '../../components/layout/AdminDashboardComponent/AdminSideBar';
import StudentDashboard from '../Student/StudentDashboard';
import Setting from '../Setting/Setting';
import StaffDashboard from '../Staff/StaffDashboard';
import EventReport from '../Event/EventReport';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LecturerSideBar from '../../components/layout/AdminDashboardComponent/LecturerSideBar';
import LecturerDashboard from '../LecturerDashboard/LecturerDashboard';
import ModulePage from '../Module/ModulePage';
import EventLectureCreationDashboard from '../LecturerDashboard/EventLectureCreationDashboard';
import LocationService from '../../api/services/LocationService';
import LogoutConfirmation from '../LogoutPage/LogoutConfirmation';
import { resetSideBarIndex } from '../../redux/features/mainNavigationSlice';
import ReportPage from '../ReportPage/ReportPage';
import LectureCreationPage from '../LactureCreation/LectureCreationPage';
import { IoMenu } from 'react-icons/io5';
import { AuthContext } from '../../config/AuthProvider';

function MainNavigationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sideBarIndex = useSelector((state) => state.mainNavigation);
  const locationList = useSelector((state) => state.locationList);
  const { user ,logout } = useContext(AuthContext);
  const { role } = user || {};

  const [venuesList, setVenuesList] = useState([]);
  const [openMenu, setOpenMenu] = useState(0);
  const [handleShowLogoutWindow, setHandleShowLogoutWindow] = useState(false);

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  const handleLogoutClick = () => {
    dispatch(resetSideBarIndex());
    logout();
  };

  // If user is already logged in, redirect to mainNavigation
  useEffect(() => {
    console.log("mainNavigationPage" ,user);
    if (!user) {
      navigate('/signin');
    }
    handleGetLocationNameList();
    if (sideBarIndex) {
      console.log(sideBarIndex);
      setOpenMenu(parseInt(sideBarIndex.sideBarIndex));
    }
  }, [user, navigate]);

  const [isHidden, setIsHidden] = useState(false);
  const handleShow = () => {
    if (isHidden) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };
  const handleClose = () => {
    setIsHidden(true);
  };

  return (
    <div className="staff-Main">
      <div className="menuButton" onClick={handleShow}>
        <IoMenu className="menu-button-icon" size={'30px'} />
      </div>
      <StaffNavBar setIndex={setOpenMenu} />
      <div className="staff-Submain">
        {!isHidden && role === 'ADMIN' && (
          <AdminSideBar
            handleClose={handleClose}
            index={openMenu}
            setIndex={setOpenMenu}
            handleLogout={() => setHandleShowLogoutWindow(true)}
          />
        )}
        {!isHidden && role === 'LECTURER' && (
          <LecturerSideBar
            handleClose={handleClose}
            index={openMenu}
            setIndex={setOpenMenu}
            handleShowLogoutWindow={() => {
              setHandleShowLogoutWindow(true);
            }}
          />
        )}
        {role === 'ADMIN' && (
          <div className="maincontent">
            {openMenu === 0 && <AdminDashboard />}
            {/* {openMenu === 1 && (
              <AdminEventCreationDashboard locationList={venuesList} />
            )} */}
            {openMenu === 1 && <StaffDashboard />}
            {openMenu === 2 && <StudentDashboard />}
            {openMenu === 3 && <EventReport />}
            {openMenu === 6 && <Setting />}
          </div>
        )}
        {role === 'LECTURER' && (
          <div className="maincontent">
            {openMenu === 0 && <LecturerDashboard />}
            {openMenu === 1 && <LectureCreationPage />}
            {openMenu === 2 && <EventLectureCreationDashboard />}
            {openMenu === 3 && <ModulePage />}
            {openMenu === 4 && <ReportPage />}
            {openMenu === 5 && <EventReport />}
            {openMenu === 6 && <Setting />}
          </div>
        )}
        {handleShowLogoutWindow === true && (
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
  );
}

export default MainNavigationPage;
