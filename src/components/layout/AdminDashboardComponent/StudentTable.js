import React, { useState, useEffect } from "react";
import "../../pages/AdminDashboard/AdminDashboard.css";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const StudentTable = ({ handleUpdateStudent }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the list of students from the API
    axios
      .post("http://localhost:8080/api/v1/mobile/getallstudents")
      .then((res) => {
        console.log(res);
        // Update the component state with the fetched list of students
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
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
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.studentName}</td>
              <td>{deparmentList[student.departmentId - 1]}</td>
              <td>{student.username}</td>
              <td>********</td>
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
