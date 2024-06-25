import React, { useState, useEffect } from "react";
import "../AdminDashboard/AdminDashboard.css";
import { FaEdit } from "react-icons/fa";

const StudentTable = ({ handleUpdateStudent, onStudentClick, studentList }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentClick = (student) => {
    onStudentClick(student);
    setSelectedStudent(student);
  };

  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA", "DIS"];

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
        <tbody>
          {studentList.map((student, index) => (
            <tr
              key={index}
              onClick={() => handleStudentClick(student)}
              className={
                selectedStudent === student ? "selected-row" : "event-row"
              }
            >
              <td>{index + 1}</td>
              <td>{student.studentName}</td>
              <td>{student.indexNumber}</td>
              <td>{departmentList[student.departmentId - 1]}</td>
              <td>{student.currentSemester}</td>
              <td>
                <button
                  onClick={() => handleUpdateStudent(student)}
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

export default StudentTable;
