import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineEventNote } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import "../../../pages/StaffMainNavigation/StaffMainNavigation.css";
import logo from "../../../assets/Images/logo/logo_white.png";
import Sidebarbutton from "./Sidebarbutton";
import { AiFillDashboard } from "react-icons/ai";

const StaffSideBar = ({ handleclose }) => {
  return (
    <div class="Staff-Sidebar">
      <div className="closeButton" onClick={handleclose}>
        <IoMdCloseCircleOutline />
      </div>
      <img src={logo} className="Sidebarlogo" />
      <div className="SideBar">
        <Sidebarbutton
          title={"Dashboard"}
          titlewithiconicon={<AiFillDashboard className="buttonIcon" />}
        />
        <Sidebarbutton
          title={"Event"}
          titlewithiconicon={<MdOutlineEventNote className="buttonIcon" />}
        />
        <Sidebarbutton
          title={"Staff"}
          titlewithiconicon={<FaUserTie className="buttonIcon" />}
        />
        <Sidebarbutton
          title={"Student"}
          titlewithiconicon={<PiStudentBold className="buttonIcon" />}
        />
        <Sidebarbutton
          title={"Setting"}
          titlewithiconicon={<IoSettings className="buttonIcon" />}
        />
        <Sidebarbutton
          title={"Logout"}
          titlewithiconicon={<IoLogOut className="buttonIcon" />}
        />
      </div>
    </div>
  );
};

export default StaffSideBar;
