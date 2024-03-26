import React, { useState, useEffect } from "react";
import "../../pages/AdminDashboard/AdminDashboard.css";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const StaffTable = ({ handleUpdateStaff }) => {
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
            <th className="expand">Name</th>
            <th>Department</th>
            <th>Username</th>
            <th>Password</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{staff.firstName + " " + staff.lastName}</td>
              <td>{deparmentList[staff.departmentId - 1]}</td>
              <td>{staff.username}</td>
              <td>********</td>
              <td>
                <button
                  onClick={() => handleUpdateStaff(staff)}
                  className="EditButton"
                >
                  <FaEdit className="EditIcon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
