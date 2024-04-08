import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineEventNote } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import "../../../pages/StaffMainNavigation/StaffMainNavigation.css";
import logo from "../../../assets/Images/logo/logo_white.png";
import Sidebarbutton from "../StaffDashboardComponents/Sidebarbutton";
import { AiFillDashboard } from "react-icons/ai";
import Logout from "../../../api/services/logoutService";
import { useDispatch } from "react-redux";
import { TbReport } from "react-icons/tb";

const AdminSideBar = ({ handleclose, index, setIndex }) => {
  const handleMenuClick = (menuIndex) => {
    setIndex(index === menuIndex ? 0 : menuIndex);
  };

  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    Logout.handleLogout(dispatch); // Assuming handleLogout is asynchronous
  };

  return (
    <div className="Staff-Sidebar">
      <div className="closeButton" onClick={handleclose}>
        <IoMdCloseCircleOutline />
      </div>
      <img src={logo} className="Sidebarlogo" alt="Logo" />
      <div className="SideBar">
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(0)}
          title={"Dashboard"}
          titlewithiconicon={<AiFillDashboard className="buttonIcon" />}
          isOpen={index === 0}
        />
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(1)}
          title={"Event"}
          titlewithiconicon={<MdOutlineEventNote className="buttonIcon" />}
          isOpen={index === 1}
        />
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(2)}
          title={"Staff"}
          titlewithiconicon={<FaUserTie className="buttonIcon" />}
          isOpen={index === 2}
        />
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(3)}
          title={"Student"}
          titlewithiconicon={<PiStudentBold className="buttonIcon" />}
          isOpen={index === 3}
        />
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(4)}
          title={"Report"}
          titlewithiconicon={<TbReport className="buttonIcon" />}
          isOpen={index === 4}
        />
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(5)}
          title={"Setting"}
          titlewithiconicon={<IoSettings className="buttonIcon" />}
          isOpen={index === 5}
        />
        <Sidebarbutton
          handleSidebarMenu={handleLogoutClick}
          title={"Logout"}
          titlewithiconicon={<IoLogOut className="buttonIcon" />}
        />
      </div>
    </div>
  );
};

export default AdminSideBar;
