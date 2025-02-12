import React, { useState, useEffect } from 'react';
import '../AdminDashboard/AdminDashboard.css';
import { FaEdit } from 'react-icons/fa';

const StudentTable = ({ handleUpdateStudent, onStudentClick, studentList, search }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const handleStudentClick = (student) => {
    onStudentClick(student);
    setSelectedStudent(student);
  };

  const departmentList = ['DEIE', 'DCOM', 'DMME', 'DCEE', 'DMENA', 'DIS'];

  return (
    <div className="tableDesign">
      <table className="student-tableArrangement">
        <thead>
          <tr>
            <th>No</th>
            <th className="expand">Name</th>
            <th>IndexNo</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Edit</th>
          </tr>
        </thead>
        {studentList.filter(
              (student) => student.firstName.toLowerCase().includes(search.toLowerCase()) ||
              student.indexNumber.toLowerCase().includes(search.toLowerCase())
            ).length > 0 ? <tbody>
          {studentList.filter(
              (student) => student.firstName.toLowerCase().includes(search.toLowerCase()) ||
              student.indexNumber.toLowerCase().includes(search.toLowerCase())
            )
            .map((student, index) => (
            <tr
              key={index}
              onClick={() => handleStudentClick(student)}
              className={selectedStudent === student ? 'selected-row' : 'event-row'}
            >
              <td>{index + 1}</td>
              <td>{student.firstName}</td>
              <td>{student.indexNumber}</td>
              <td>{departmentList[student.departmentId - 1]}</td>
              <td>{student.semester}</td>
              <td>
                <button onClick={() => handleUpdateStudent(student)} className="EditButton">
                  <FaEdit className="EditIcon" />
                </button>
              </td>
            </tr>
          ))}
        </tbody> : <tbody className='nodata'>
          No Data Available
        </tbody>}
      </table>
    </div>
  );
};

export default StudentTable;
