import React from 'react';
import { IoSettings } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineEventNote } from "react-icons/md";
import '../../pages/StaffMainNavigation/StaffMainNavigation.css'
import logo from '../../../assets/Images/logo/logo_white.png'
import Sidebarbutton from './Sidebarbutton';
import { AiFillDashboard } from "react-icons/ai";

const StaffSideBar = () => {
  return (
    <div class="Staff-Sidebar">
      <img src={logo} className='Sidebarlogo'/>
      <div className='SideBar'>
        <Sidebarbutton title={'Dashboard'} titlewithiconicon={<AiFillDashboard className='buttonIcon'/>}/>
        <Sidebarbutton title={'Event'} titlewithiconicon={<MdOutlineEventNote className='buttonIcon'/>}/>
        <Sidebarbutton title={'Staff'} titlewithiconicon={<FaUserTie className='buttonIcon'/>}/>
        <Sidebarbutton title={'Student'} titlewithiconicon={<PiStudentBold className='buttonIcon'/>}/>
        <Sidebarbutton title={'Setting'} titlewithiconicon={<IoSettings className='buttonIcon'/>}/>
      </div>
    </div>
  );
}

export default StaffSideBar;