import React, { useState } from "react";
import "./AdminDashboard.css";
import Table from '../../layout/AdminDashboardComponent/Table'
import TotalCount from "../../layout/AdminDashboardComponent/TotalCount";
import { FaUsers } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
import { FaSchool } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";
import NormalButton from "../../layout/AdminDashboardComponent/NormalButton";
import { MdCreateNewFolder } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import AdminEventCreation from "../Event/AdminEventCreation";

const AdminDashboard = () => {
  const [eventCreatePopUpWindow, setEventCreatePopUpWindow]=useState(false);
  const [closeEventCreateWindow, setCloseEventCreateWindow]=useState(true)

  return (
    <div className="admin-Dash">
      <p className="mainHead">Admin Dashboard</p>
      <div className="mainInform">
        <TotalCount total={"20"} countIcon={<FaUsers style={{color: "white", padding: "2%", fontSize: "250%"}}/>} countTitle={"Total Staffs"}/>
        <TotalCount total={"201"} countIcon={<PiUsersFourFill style={{color: "white", padding: "2%", fontSize: "250%"}}/>} countTitle={"Total Students"}/>
        <TotalCount total={"08"} countIcon={<FaSchool style={{color: "white", padding: "2%", fontSize: "250%"}}/>} countTitle={"Total Departments"}/>
        <TotalCount total={"350"} countIcon={<IoNewspaperSharp style={{color: "white", padding: "2%", fontSize: "250%"}}/>} countTitle={"Total Modules"}/>
      </div>
      <p className="mainHead">Upcoming Events</p>
      <div className="AdminEventList">
        <Table/>
        <div className="List-Buttons">
          <NormalButton handleClick={()=>setEventCreatePopUpWindow(true)} title={"Create"} titlewithiconicon={<MdCreateNewFolder className="buttonIcon"/>}/>
          <NormalButton title={"Delete"} titlewithiconicon={<RiDeleteBin5Fill className="buttonIcon"/>}/>
        </div>
      </div>
      {eventCreatePopUpWindow && (<div className="Admin-Create-Event-Dashboard">
        <AdminEventCreation handlecloseCreateEventWindow={()=>setEventCreatePopUpWindow(false)}/>
      </div>)}
    </div>
  );
};

export default AdminDashboard;
