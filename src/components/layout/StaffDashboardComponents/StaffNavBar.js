import React from "react";
import logo from "../../../assets/Images/logo/logo_white.png";
import "../../../pages/StaffMainNavigation/StaffMainNavigation.css";
import ProfileButton from "./ProfileButton";

const StaffNavBar = ({ setIndex }) => {
  return (
    <div className="Staff-Navbar">
      <div className="Staff-Icon">
        <img className="Staff-Logo" src={logo} alt="" />
        <p className="Webname">SKY TICKER</p>
      </div>
      <ProfileButton setIndex={setIndex} />
    </div>
  );
};

export default StaffNavBar;
