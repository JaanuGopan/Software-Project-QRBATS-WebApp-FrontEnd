import React, { useState, useEffect } from "react";
import "../../../pages/AdminDashboard/AdminDashboard.css";
import { FaEdit } from "react-icons/fa";
import GetAllStudentsService from "../../../api/services/GetAllStudentService";

const StudentTable = ({ handleUpdateStudent, selectedStudent }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the list of students from the API
    const response = GetAllStudentsService.getAllStudent();
    response.then((res) => {
      setStudents(res);
    });
    console.log(students);
  }, []);

  const handleStudentClick = (student) => {
    selectedStudent(student);
  };

  const deparmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];

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
          {students.map((student, index) => (
            <tr key={index} onClick={() => handleStudentClick(student)}>
              <td>{index + 1}</td>
              <td>{student.studentName}</td>
              <td>{student.indexNumber}</td>
              <td>{deparmentList[student.departmentId - 1]}</td>
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
