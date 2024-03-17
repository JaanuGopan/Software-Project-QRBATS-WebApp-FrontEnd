import React, { useState } from "react";
import "./MainNavigation.css";
import '../StaffMainNavigation/StaffMainNavigation.css'
import EventCreation from "../Event/EventCreation/EventCreation";
import { useLocation } from "react-router-dom";
import Staff from "../StaffDashboard/Staff";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import { PiListDashesFill } from "react-icons/pi";
import StaffNavBar from "../../layout/StaffDashboardComponents/StaffNavBar";
import AdminSideBar from "../../layout/AdminDashboardComponent/AdminSideBar";

function MainNavigationPage() {
  const location = useLocation();
  const { userEmail } = location.state;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const [contentTitle, setContentTitle] = useState("Dashboard");

  const [isHidden, setIsHidden] = useState(false);
  const handleshow = () => {
    setIsHidden(false);
  };
  const handleclose = () => {
    setIsHidden(true)
  }

  const [openMenu, setOpenMenu]=useState(0);

  return (
    <div className="staff-Main">
      <div className='menuButton' onClick={handleshow}><PiListDashesFill size={'30px'}/></div>
      <StaffNavBar/>
      <div className="staff-Submain">
      {!isHidden && (<AdminSideBar handleclose={handleclose} index={openMenu} setIndex={setOpenMenu}/>)}
          <div className="maincontent">
            {openMenu === 0 && <AdminDashboard />}
            {openMenu === 1 && <EventCreation />} 
            {openMenu === 2 && <Staff />}
          </div>
      </div>
    </div>
  );
}

export default MainNavigationPage;