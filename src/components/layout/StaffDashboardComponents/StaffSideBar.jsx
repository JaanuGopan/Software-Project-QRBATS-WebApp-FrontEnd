import React from 'react';
import { AiFillDashboard } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { IoLogOut, IoSettings } from 'react-icons/io5';
import { MdOutlineEventNote } from 'react-icons/md';
import { PiStudentBold } from 'react-icons/pi';
import logo from '../../../assets/Images/logo/logo_white.png';
import '../../../pages/StaffMainNavigation/StaffMainNavigation.css';
import Sidebarbutton from './Sidebarbutton';

const StaffSideBar = ({ handleclose }) => {
  return (
    <div class="Staff-Sidebar">
      <div className="closeButton" onClick={handleclose}>
        <IoMdCloseCircleOutline />
      </div>
      <img src={logo} className="Sidebarlogo" />
      <div className="SideBar">
        <Sidebarbutton title={'Dashboard'} icon={<AiFillDashboard className="buttonIcon" />} />
        <Sidebarbutton title={'Event'} icon={<MdOutlineEventNote className="buttonIcon" />} />
        <Sidebarbutton title={'Staff'} icon={<FaUserTie className="buttonIcon" />} />
        <Sidebarbutton title={'Student'} icon={<PiStudentBold className="buttonIcon" />} />
        <Sidebarbutton title={'Settings'} icon={<IoSettings className="buttonIcon" />} />
        <Sidebarbutton title={'Logout'} icon={<IoLogOut className="buttonIcon" />} />
      </div>
    </div>
  );
};

export default StaffSideBar;
