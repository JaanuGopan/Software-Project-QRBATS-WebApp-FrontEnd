import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import '../../../components/tables/table.css';
import Department from '../../../utils/Department';

const StaffTable = ({ search, handleUpdateStaff, handleDeleteStaff, onStaffClick, staffsList }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff);
    onStaffClick(staff);
  };

  const departmentList = Department.departmentList;

  return (
    <div className="table-container">
      <table className="table table-hover">
        <thead className="sticky-header">
          <tr className="table-header-row">
            <th className="col">No</th>
            <th className="col">Name</th>
            <th className="col">Department</th>
            <th className="col">Email</th>
            <th className="col">Actions</th>
          </tr>
        </thead>
        {staffsList.filter(
          (staff) =>
            staff.firstName.toLowerCase().includes(search.toLowerCase()) ||
            staff.lastName.toLowerCase().includes(search.toLowerCase()) ||
            staff.username.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
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
                  className={'table-row' + (selectedStaff === staff ? ' table-selected-row' : '')}
                >
                  <td>{index + 1}</td>
                  <td>{staff.firstName + ' ' + staff.lastName}</td>
                  <td>{departmentList[staff.departmentId - 1]}</td>
                  <td>{staff.email}</td>
                  <td>
                    <div className="row table-action-icons">
                      <div className="col px-0 d-flex justify-content-center align-items-center">
                        <IconButton onClick={() => handleUpdateStaff(staff)}>
                          <FaEdit color="#0063a0" size={'20px'} />
                        </IconButton>
                      </div>
                      <div className="col ps-0  d-flex justify-content-center align-items-center">
                        <IconButton onClick={() => handleDeleteStaff(staff)}>
                          <MdDeleteForever color="#f01e2c" size={'20px'} />
                        </IconButton>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : (
          <tbody className="nodata">No Data Available</tbody>
        )}
      </table>
    </div>
  );
};

export default StaffTable;
