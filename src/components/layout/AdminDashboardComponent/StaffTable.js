import React, { useState, useEffect } from "react";
import "../../../pages/AdminDashboard/AdminDashboard.css";
import { FaEdit } from "react-icons/fa";

const StaffTable = ({
  search,
  handleUpdateStaff,
  onStaffClick,
  staffsList,
}) => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff);
    onStaffClick(staff);
  };

  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA", "DIS"];

  return (
    <div className="tableDesign">
      <table className="student-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {staffsList
            .filter(
              (staff) =>
                staff.firstName.toLowerCase().includes(search.toLowerCase()) ||
                staff.lastName.toLowerCase().includes(search.toLowerCase()) ||
                staff.username.toLowerCase().includes(search.toLowerCase())
            )
            .map((staff, index) => (
              <tr
                key={index}
                onClick={() => handleStaffClick(staff)}
                className={selectedStaff === staff ? "selected-row" : ""}
              >
                <td>{index + 1}</td>
                <td>{staff.firstName + " " + staff.lastName}</td>
                <td>{departmentList[staff.departmentId - 1]}</td>
                <td>{staff.email}</td>

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
