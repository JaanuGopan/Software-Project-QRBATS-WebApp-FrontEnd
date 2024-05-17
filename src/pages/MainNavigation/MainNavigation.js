import React, { useState, useEffect } from "react";
import "./MainNavigation.css";
import "../StaffMainNavigation/StaffMainNavigation.css";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import { PiListDashesFill } from "react-icons/pi";
import StaffNavBar from "../../components/layout/StaffDashboardComponents/StaffNavBar";
import AdminSideBar from "../../components/layout/AdminDashboardComponent/AdminSideBar";
import EventCreateDashboard from "../Event/EventCreateDashboard";
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

function MainNavigationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { role } = user || {};

  const [venuesList, setVenuesList] = useState([]);

  const handleGetLocationNameList = async () => {
    const response = await LocationService.getAllLocationNames();
    setVenuesList(response);
  };

  // If user is already logged in, redirect to mainNavigation
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    handleGetLocationNameList();
  }, [user, navigate]);

  const [isHidden, setIsHidden] = useState(false);
  const handleshow = () => {
    setIsHidden(false);
  };
  const handleclose = () => {
    setIsHidden(true);
  };

  const [openMenu, setOpenMenu] = useState(0);

  return (
    <div className="staff-Main">
      <div className="menuButton" onClick={handleshow}>
        <PiListDashesFill size={"30px"} />
      </div>
      <StaffNavBar setIndex={setOpenMenu} />
      <div className="staff-Submain">
        {!isHidden && role === "ADMIN" && (
          <AdminSideBar
            handleclose={handleclose}
            index={openMenu}
            setIndex={setOpenMenu}
          />
        )}
        {!isHidden && role === "LECTURER" && (
          <LecturerSideBar
            handleclose={handleclose}
            index={openMenu}
            setIndex={setOpenMenu}
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
            {openMenu === 4 && <EventReport />}
            {openMenu === 5 && <Setting />}
          </div>
        )}
        {role === "LECTURER" && (
          <div className="maincontent">
            {openMenu === 0 && <LecturerDashboard />}
            {openMenu === 1 && <LectureCreationDashboard />}
            {openMenu === 2 && <ModulePage />}
            {openMenu === 3 && <EventReport />}
            {openMenu === 4 && <Setting />}
          </div>
        )}
      </div>
    </div>
  );
}

export default MainNavigationPage;
