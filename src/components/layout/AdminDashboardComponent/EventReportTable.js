import React, { useState, useEffect } from "react";
import "../../pages/AdminDashboard/AdminDashboard.css";
import { CiViewList } from "react-icons/ci";
import axios from "axios";

const EventReportTable = ({handleOpenReportWindow}) => {
  const [staffs, setStaffs] = useState([]);

    useEffect(() => {
      // Fetch the list of staffs from the API
      axios
        .post("http://localhost:8080/api/v1/auth/getallstaffs")
        .then((res) => {
          console.log(res);
          // Update the component state with the fetched list of staffs
          setStaffs(res.data);
        })
        .catch((err) => {
          console.error("Error fetching staffs:", err);
        });
    }, []);
    const deparmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];

  return (
    <div className="tableDesign">
      <table className="event-report-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Venue</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>1</td>
              <td>Seminar</td>
              <td>12-11-2024</td>
              <td>12-11-2024</td>
              <td>NCC</td>
              <td>12.30 pm</td>
              <td>4.30 pm</td>
              <td>
                <button
                  onClick={handleOpenReportWindow}
                  className="ViewButton">
                  <CiViewList className="EditIcon" />
                  <p className="ViewButtonLabel">View</p>
                </button>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EventReportTable;
