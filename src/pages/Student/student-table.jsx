import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import '../../components/tables/table.css';
import Department from '../../utils/Department';

const StudentTable = ({
  handleUpdateStudent,
  handleDeleteStudent,
  onStudentClick,
  studentList,
  search,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentClick = (student) => {
    onStudentClick(student);
    setSelectedStudent(student);
  };

  const departmentList = Department.studentDepartmentList;

  return (
    <div className="table-container">
      <table className="table table-hover">
        <thead className="sticky-header">
          <tr className="table-header-row">
            <th className="col">No</th>
            <th className="col">Name</th>
            <th className="col">IndexNo</th>
            <th className="col">Department</th>
            <th className="col">Semester</th>
            <th className="col">Actions</th>
          </tr>
        </thead>
        {studentList.filter(
          (student) =>
            student.firstName.toLowerCase().includes(search.toLowerCase()) ||
            student.indexNumber.toLowerCase().includes(search.toLowerCase())
        ).length > 0 ? (
          <tbody>
            {studentList
              .filter(
                (student) =>
                  student.firstName.toLowerCase().includes(search.toLowerCase()) ||
                  student.indexNumber.toLowerCase().includes(search.toLowerCase())
              )
              .map((student, index) => (
                <tr
                  key={index}
                  onClick={() => handleStudentClick(student)}
                  className={
                    'table-row' + (selectedStudent === student ? ' table-selected-row' : '')
                  }
                >
                  <td>{index + 1}</td>
                  <td>{student.firstName}</td>
                  <td>{student.indexNumber}</td>
                  <td>{departmentList[student.departmentId - 1]}</td>
                  <td>{student.semester}</td>
                  <td>
                    <div className="row table-action-icons">
                      <div className="col px-0 d-flex justify-content-center align-items-center">
                        <IconButton onClick={() => handleUpdateStudent(student)}>
                          <FaEdit color="#0063a0" size={'20px'} />
                        </IconButton>
                      </div>
                      <div className="col ps-0  d-flex justify-content-center align-items-center">
                        <IconButton onClick={() => handleDeleteStudent(student)}>
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

export default StudentTable;
