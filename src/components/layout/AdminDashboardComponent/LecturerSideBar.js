import React, { useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { MdOutlineEventNote, MdQrCode } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import "../../../pages/StaffMainNavigation/StaffMainNavigation.css";
import logo from "../../../assets/Images/logo/logo_white.png";
import Sidebarbutton from "../StaffDashboardComponents/Sidebarbutton";
import { AiFillDashboard } from "react-icons/ai";
import Logout from "../../../api/services/logoutService";
import { useDispatch } from "react-redux";
import { TbReport } from "react-icons/tb";
import {
  setSideBarIndex,
  resetSideBarIndex,
} from "../../../redux/features/mainNavigationSlice";
import { FaList } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { FaRegListAlt } from "react-icons/fa";
import LectureIcon from "../../../assets/Icons/lecture_Icon.png";
import { School } from "@mui/icons-material";
const LecturerSideBar = ({
  handleClose,
  index,
  setIndex,
  handleShowLogoutWindow,
}) => {
  const dispatch = useDispatch();
  const handleMenuClick = (menuIndex) => {
    dispatch(setSideBarIndex(menuIndex));
    setIndex(menuIndex);
  };

  const handleLogoutClick = () => {
    Logout.handleLogout(dispatch); // Assuming handleLogout is asynchronous
    dispatch(resetSideBarIndex());
  };

  return (
    <div className="Staff-Sidebar">
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
          title={"Lecture"}
          titlewithiconicon={<School className="buttonIcon" />}
          isOpen={index === 1}
        />
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(2)}
          title={"Event"}
          titlewithiconicon={<MdQrCode className="buttonIcon" />}
          isOpen={index === 2}
        />
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(3)}
          title={"Module"}
          titlewithiconicon={<MdOutlineEventNote className="buttonIcon" />}
          isOpen={index === 3}
        />

        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(4)}
          title={"Lecture Report"}
          titlewithiconicon={<TbReport className="buttonIcon" />}
          isOpen={index === 4}
        />
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(5)}
          title={"Event Report"}
          titlewithiconicon={<TbReport className="buttonIcon" />}
          isOpen={index === 5}
        />
        <Sidebarbutton
          handleSidebarMenu={() => handleMenuClick(6)}
          title={"Settings"}
          titlewithiconicon={<IoSettings className="buttonIcon" />}
          isOpen={index === 6}
        />
        <Sidebarbutton
          handleSidebarMenu={handleShowLogoutWindow}
          title={"Logout"}
          titlewithiconicon={<IoLogOut className="buttonIcon" />}
        />
      </div>
    </div>
  );
};

export default LecturerSideBar;
