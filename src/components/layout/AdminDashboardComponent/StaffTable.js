import React, { useState, useEffect } from "react";
import "../../../pages/AdminDashboard/AdminDashboard.css";
import { FaEdit } from "react-icons/fa";

const StaffTable = ({
  search,
  handleUpdateStaff,
  onStaffClick,
  staffsList,
}) => {
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    // Fetch the list of staffs from the API
    setStaffs(staffsList);
  }, [staffsList]);

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff);
    onStaffClick(staff);
  };

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
          {staffs
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
