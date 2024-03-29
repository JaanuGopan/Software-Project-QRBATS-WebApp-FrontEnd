import React, { useState, useEffect } from "react";
import "../../pages/AdminDashboard/AdminDashboard.css";
import { CiViewList } from "react-icons/ci";
import axios from "axios";

const EventAttendancetable = () => {
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
      <table className="student-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">First Name</th>
            <th className="expand">Last Name</th>
            <th>Registration Number</th>
            <th>Attendance Time</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <td>1</td>
              <td>MJgdhwudy</td>
              <td>jkfgedf</td>
              <td>EG20205486</td>
              <td>12.56 pm</td>
            </tr>
            <tr>
              <td>2</td>
              <td>MJgdhwudy</td>
              <td>jkfgedf</td>
              <td>EG20205486</td>
              <td>12.56 pm</td>
            </tr>
            <tr>
              <td>3</td>
              <td>MJgdhwudy</td>
              <td>jkfgedf</td>
              <td>EG20205486</td>
              <td>12.56 pm</td>
            </tr>
            <tr>
              <td>4</td>
              <td>MJgdhwudy</td>
              <td>jkfgedf</td>
              <td>EG20205486</td>
              <td>12.56 pm</td>
            </tr>
            <tr>
              <td>5</td>
              <td>MJgdhwudy</td>
              <td>jkfgedf</td>
              <td>EG20205486</td>
              <td>12.56 pm</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EventAttendancetable;