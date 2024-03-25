import React, { useState } from "react";
import "./MainNavigation.css";
import "../StaffMainNavigation/StaffMainNavigation.css";
import { useLocation } from "react-router-dom";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import { PiListDashesFill } from "react-icons/pi";
import StaffNavBar from "../../layout/StaffDashboardComponents/StaffNavBar";
import AdminSideBar from "../../layout/AdminDashboardComponent/AdminSideBar";
import EventCreateDashboard from "../Event/EventCreateDashboard";
import StudentDashboard from "../Student/StudentDashboard";
import Setting from "../Setting/Setting";
import StaffDashboard from "../Staff/StaffDashboard";

function MainNavigationPage() {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

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
      <StaffNavBar />
      <div className="staff-Submain">
        {!isHidden && (
          <AdminSideBar
            handleclose={handleclose}
            index={openMenu}
            setIndex={setOpenMenu}
          />
        )}
        <div className="maincontent">
          {openMenu === 0 && <AdminDashboard />}
          {openMenu === 1 && <EventCreateDashboard/>}
          {openMenu === 2 && <StaffDashboard />}
          {openMenu === 3 && <StudentDashboard/>}
          {openMenu === 4 && <Setting/>}
        </div>
      </div>
    </div>
  );
}

export default MainNavigationPage;
