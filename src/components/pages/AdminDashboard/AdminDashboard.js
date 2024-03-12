import React from "react";
import Calender from "../../layout/UserInterfaceCom/Calender";
import "./AdminDashboard.css";
import Table from "../../layout/AdminDashboardComponent/Table";
import TotalCount from "../../layout/AdminDashboardComponent/TotalCount";

const AdminDashboard = () => {
  return (
    <div>
      <p className="mainHead">Admin Dashboard</p>
      <div className="mainInform">
        <TotalCount />
        <TotalCount />
        <TotalCount />
        <TotalCount />
      </div>
      <p className="mainHead">Upcoming Events</p>
      <div className="subHead">
        <div className="subBody">
          <div className="table">
            <Table />
          </div>
          <div className="Buttons1">
            <button>Create Events</button>
            <button>Delete Events</button>
          </div>
        </div>
        <Calender />
      </div>
    </div>
  );
};

export default AdminDashboard;
