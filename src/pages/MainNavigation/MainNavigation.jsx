import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LocationService from '../../api/services/LocationService';
import Navbar from '../../components/layout/navbar/navbar';
import SideBar from '../../components/layout/sidebar/sidebar';
import { AuthContext } from '../../config/AuthProvider';
import { resetSideBarIndex } from '../../redux/features/mainNavigationSlice';
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
import '../StaffMainNavigation/StaffMainNavigation.css';
import StudentDashboard from '../Student/StudentDashboard';
import './MainNavigation.css';

function MainNavigationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sideBarIndex = useSelector((state) => state.mainNavigation);
  const locationList = useSelector((state) => state.locationList);
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
    dispatch(resetSideBarIndex());
    logout();
  };

  // If user is already logged in, redirect to mainNavigation
  useEffect(() => {
    if (!user) {
      navigate('/signin');
    }
    handleGetLocationNameList();
    if (sideBarIndex) {
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
    <div className="container-fluid pe-0 main-navigation-container">
      <div className="row h-100">
        <div className="col position-fixed">
          <div className="row">
            <Navbar setIndex={setOpenMenu} />
          </div>
          <div className="row w-100 h-100 flex-nowrap">
            <div className="col-auto">
              <SideBar
                handleClose={handleClose}
                index={openMenu}
                setIndex={setOpenMenu}
                handleShowLogoutWindow={() => {
                  setHandleShowLogoutWindow(true);
                }}
                role={role}
              />
            </div>
            <div className="col main-navigation-content-container">
              {role === 'LECTURER' ? (
                <>
                  {openMenu === 0 && <LecturerDashboard />}
                  {openMenu === 1 && <LectureCreationPage />}
                  {openMenu === 2 && <EventCreationDashboard />}
                  {openMenu === 3 && <ModulePage />}
                  {openMenu === 4 && <ReportPage />}
                  {openMenu === 5 && <EventReport />}
                  {openMenu === 6 && <Setting />}
                </>
              ) : (
                <>
                  {role === 'ADMIN' && (
                    <>
                      {openMenu === 0 && <AdminDashboard />}
                      {openMenu === 1 && <StaffDashboard />}
                      {openMenu === 2 && <StudentDashboard />}
                      {openMenu === 3 && <EventReport />}
                      {openMenu === 6 && <Setting />}
                    </>
                  )}
                </>
              )}
            </div>
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
      </div>
    </div>
  );
}

export default MainNavigationPage;
