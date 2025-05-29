import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LocationService from '../../api/services/LocationService';
import Navbar from '../../components/layout/navbar/navbar';
import SideBar from '../../components/layout/sidebar/sidebar';
import { AuthContext } from '../../config/AuthProvider';
import { setLocationList } from '../../redux/features/locationListSlice';
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
import './MainNavigation.css';

const MainNavigationPage = ({ contentName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, logout } = useContext(AuthContext);
  const { role } = user || {};

  const [venuesList, setVenuesList] = useState([]);
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
      navigate('/');
    }
    handleGetLocationNameList();
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
    if (role === 'LECTURER') {
      switch (contentName) {
        case 'LecturerDashboard':
          return <LecturerDashboard />;
        case 'LectureCreationPage':
          return <LectureCreationPage />;
        case 'EventCreationDashboard':
          return <EventCreationDashboard />;
        case 'ModulePage':
          return <ModulePage />;
        case 'ReportPage':
          return <ReportPage />;
        case 'EventReport':
          return <EventReport />;
        case 'Settings':
          return <Setting />;
        default:
          return null;
      }
    } else if (role === 'ADMIN') {
      switch (contentName) {
        case 'AdminDashboard':
          return <AdminDashboard />;
        case 'StaffDashboard':
          return <StaffDashboard />;
        case 'StudentDashboard':
          return <StudentDashboard />;
        case 'EventReport':
          return <EventReport />;
        case 'Settings':
          return <Setting />;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div className="container-fluid pe-0 main-navigation-container">
      <div className="row h-100">
        <div className="col">
          <div className="row position-fixed w-100 nav-bar-container">
            <Navbar />
          </div>
          <div className="main-content-container row flex-nowrap">
            <div className="col-auto">
              <SideBar
                handleClose={handleClose}
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
