import React from "react";
import "./AdminDashboard.css";
import Table from '../../layout/AdminDashboardComponent/Table'
import TotalCount from "../../layout/AdminDashboardComponent/TotalCount";
import { FaUsers } from "react-icons/fa";
import { PiUsersFourFill } from "react-icons/pi";
import { FaSchool } from "react-icons/fa6";
import { IoNewspaperSharp } from "react-icons/io5";

const AdminDashboard = () => {
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
      <Table/>
    </div>
  );
};

export default AdminDashboard;
