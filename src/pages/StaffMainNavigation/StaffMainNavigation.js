import React, { useState } from "react";
import "./StaffMainNavigation.css";
import { PiListDashesFill } from "react-icons/pi";
import StaffNavBar from "../../components/layout/StaffDashboardComponents/StaffNavBar";
import StaffSideBar from "../../components/layout/StaffDashboardComponents/StaffSideBar";

const StaffMainNavigation = () => {
  const [isHidden, setIsHidden] = useState(false);
  const handleshow = () => {
    setIsHidden(false);
  };
  const handleclose = () => {
    setIsHidden(true);
  };
  return (
    <div className="staff-Main">
      <div className="menuButton" onClick={handleshow}>
        <PiListDashesFill size={"30px"} />
      </div>
      <StaffNavBar />
      <div class="staff-Submain">
        {!isHidden && <StaffSideBar handleclose={handleclose} />}
        <div className="Staff-Subpage">
          <div>SubPages</div>
        </div>
      </div>
    </div>
  );
};

export default StaffMainNavigation;
