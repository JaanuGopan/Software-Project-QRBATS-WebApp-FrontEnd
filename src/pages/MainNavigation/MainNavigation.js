import React, { useState, useEffect } from "react";
import "./MainNavigation.css";
import "../StaffMainNavigation/StaffMainNavigation.css";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import { PiListDashesFill } from "react-icons/pi";
import StaffNavBar from "../../components/layout/StaffDashboardComponents/StaffNavBar";
import AdminSideBar from "../../components/layout/AdminDashboardComponent/AdminSideBar";
import StudentDashboard from "../Student/StudentDashboard";
import Setting from "../Setting/Setting";
import StaffDashboard from "../Staff/StaffDashboard";
import EventReport from "../Event/EventReport";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import LecturerSideBar from "../../components/layout/AdminDashboardComponent/LecturerSideBar";
import LecturerDashboard from "../LecturerDashboard/LecturerDashboard";
import ModulePage from "../Module/ModulePage";
import LectureCreationDashboard from "../LecturerDashboard/LectureCreationDashboard";
import AdminEventCreationDashboard from "../Event/AdminEventCreationDashboard";
import LocationService from "../../api/services/LocationService";
import LogoutConfirmation from "../LogoutPage/LogoutConfirmation";
import { resetSideBarIndex } from "../../redux/features/mainNavigationSlice";
import Logout from "../../api/services/logoutService";
import ReportPage from "../ReportPage/ReportPage";

function MainNavigationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const sideBarIndex = useSelector((state) => state.mainNavigation);
  const locationList = useSelector((state) => state.locationList);

  const { role } = user || {};

  const [venuesList, setVenuesList] = useState([]);
  const [openMenu, setOpenMenu] = useState(0);
  const [handleShowLogoutWindow, setHandleShowLogoutWindow] = useState(false);

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  const handleLogoutClick = () => {
    Logout.handleLogout(dispatch); // Assuming handleLogout is asynchronous
    dispatch(resetSideBarIndex());
  };

  // If user is already logged in, redirect to mainNavigation
  useEffect(() => {
    if (!user) {
      navigate("/signin");
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

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="staff-Main">
      <div
        className="menuButton"
        onClick={handleShow}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <PiListDashesFill
          size={"30px"}
          color={isHovered ? "#0366a4" : "white"}
        />
      </div>
      <StaffNavBar setIndex={setOpenMenu} />
      <div className="staff-Submain">
        {!isHidden && role === "ADMIN" && (
          <AdminSideBar
            handleClose={handleClose}
            index={openMenu}
            setIndex={setOpenMenu}
            handleLogout={() => setHandleShowLogoutWindow(true)}
          />
        )}
        {!isHidden && role === "LECTURER" && (
          <LecturerSideBar
            handleClose={handleClose}
            index={openMenu}
            setIndex={setOpenMenu}
            handleShowLogoutWindow={() => {
              setHandleShowLogoutWindow(true);
            }}
          />
        )}
        {role === "ADMIN" && (
          <div className="maincontent">
            {openMenu === 0 && <AdminDashboard />}
            {openMenu === 1 && (
              <AdminEventCreationDashboard locationList={venuesList} />
            )}
            {openMenu === 2 && <StaffDashboard />}
            {openMenu === 3 && <StudentDashboard />}
            {openMenu === 5 && <EventReport />}
            {openMenu === 4 && <Setting />}
          </div>
        )}
        {role === "LECTURER" && (
          <div className="maincontent">
            {openMenu === 0 && <LecturerDashboard />}
            {openMenu === 1 && <LectureCreationDashboard />}
            {openMenu === 2 && <ModulePage />}
            {openMenu === 3 && <EventReport />}
            {openMenu === 4 && <ReportPage />}
            {openMenu === 5 && <Setting />}
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
