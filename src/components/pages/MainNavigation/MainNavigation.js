import React, { useState } from "react";
import logowhite from "../../../assets/Images/logo/logo_white.png";
import "./MainNavigation.css";
import {
  FaSignOutAlt,
  FaHome,
  FaQrcode,
  FaUsers,
  FaUserGraduate,
  FaChartBar,
  FaTools,
} from "react-icons/fa";
import EventCreation from "../Event/EventCreation/EventCreation";
import { useLocation } from "react-router-dom";
import Staff from "../StaffDashboard/Staff";
import AdminDashboard from "../AdminDashboard/AdminDashboard";

function MainNavigationPage() {
  const location = useLocation();
  const { userEmail } = location.state;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    window.location.href = "/";
  };

  const [contentTitle, setContentTitle] = useState("Dashboard");

  const [openMenu, setOpenMenu] = useState(0); // State to track which menu is open

  const handleMenuClick = (menuIndex) => {
    setOpenMenu(openMenu === menuIndex ? 0 : menuIndex); // Toggle open/close state of menu
  };

  return (
    <div className="main">
      <div className="top">
        <div className="titleImage_logo">
          <img src={logowhite} alt="Profile" className="logo" />
          <div className="companyname">SkyTicker</div>
        </div>
        <div className="profilename">{userEmail}</div>
      </div>

      <div className="below">
        <div className="main-page">
          <div className="sidebar">
            <div className="image1">
              <img src={logowhite} alt="Profile" className="logo" />
            </div>

            <div className="sidebar-menu">
              <div style={{ backgroundColor: "#0a69a3" }}>
                <div className="menu-item" onClick={() => handleMenuClick(0)}>
                  <FaHome className="menu-icon" />
                  <div className="menu-name">Dashboard</div>
                </div>

                <div className="menu-item" onClick={() => handleMenuClick(1)}>
                  <FaQrcode className="menu-icon" />
                  <div className="menu-name">QR Generate</div>
                </div>

                <div className="menu-item" onClick={() => handleMenuClick(2)}>
                  <FaUsers className="menu-icon" />
                  <div className="menu-name">Staff</div>
                </div>

                <div className="menu-item" onClick={() => handleMenuClick(3)}>
                  <FaUserGraduate className="menu-icon" />
                  <div className="menu-name">Student</div>
                </div>

                <div className="menu-item" onClick={() => handleMenuClick(4)}>
                  <FaChartBar className="menu-icon" />
                  <div className="menu-name">Reports</div>
                  <div className="dropdown-icon">
                    {openMenu === 4 ? "-" : "+"}
                  </div>
                </div>
                {openMenu === 4 && (
                  <div className="dropdown">
                    <div className="dropdown-item">Event</div>
                    <div className="dropdown-item">Attendance </div>
                  </div>
                )}

                <div className="menu-item" onClick={() => handleMenuClick(5)}>
                  <FaTools className="menu-icon" />
                  <div className="menu-name">Operations</div>
                  <div className="dropdown-icon">
                    {openMenu === 5 ? "-" : "+"}
                  </div>
                </div>
                {openMenu === 5 && (
                  <div className="dropdown">
                    <div className="dropdown-item">Delete Details</div>
                    <div className="dropdown-item">Update Details</div>
                  </div>
                )}
              </div>
            </div>

            <div className="logout">
              <div className="menu-item" onClick={() => handleLogout}>
                <FaSignOutAlt className="menu-icon" />
                <div className="menu-name">Logout</div>
              </div>
            </div>
          </div>
          <div className="maincontent">
            {/* <h1>{contentTitle}</h1> */}
            {openMenu === 1 && <EventCreation />} {openMenu === 2 && <Staff />}{" "}
            {openMenu === 0 && <AdminDashboard />}{" "}
            {/* Render UserProfile only when openMenu is 1 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNavigationPage;
