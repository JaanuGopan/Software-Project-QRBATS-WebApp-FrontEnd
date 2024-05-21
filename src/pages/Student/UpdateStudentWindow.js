import React, { useState } from "react";
import "./Student.css";
import axios from "axios";
import Designer from "../../assets/Images/Designer.jpeg";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import InputList from "../../components/textfields/InputList/InputList";
import UpdateStudentServices from "../../api/services/UpdateStudentService";

const UpdateStudentWindow = ({ handlecloseUpdateStudentWindow, student }) => {
  const [studentId, setStudentId] = useState(student.studentId);
  const [indexNumber, setIndexNumber] = useState(student.indexNumber);
  const [studentName, setStudentName] = useState(student.studentName);
  const [studentEmail, setStudentEmail] = useState(student.studentEmail);
  const [password, setPassword] = useState(student.password);
  const [userName, setUserName] = useState(student.username);
  const [StudentRole, setStudentRole] = useState(student.studentRole);
  const [departmentId, setDepartmentId] = useState(student.departmentId);
  const [department, setDepartment] = useState();
  const navigate = useNavigate();

  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];
  const userRoleList = ["ADMIN", "LECTURER", "STAFF"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateStudentServices.updateStudent(
        studentId,
        studentName,
        studentEmail,
        departmentList.indexOf(department) + 1
      );
      console.log(department);
      console.log(departmentList.indexOf(department) + 1);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div className="student-signup-main-container">
      <div
        className="closeCreateEventWindow"
        onClick={handlecloseUpdateStudentWindow}
      >
        <IoMdCloseCircleOutline />
      </div>
      <p className="student-head1">Update Student Details</p>
      <div className="student-login-container">
        <div className="student-image-container">
          <img src={Designer} className="student-logo" alt="Logo" />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {/* First Name Input */}
            <InputField
              placeholder="Enter your name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              inputType="text"
            />
            {/* Last Name Input */}
            <InputField
              placeholder="Enter your index number"
              value={indexNumber}
              onChange={(e) => setIndexNumber(e.target.value)}
              inputType="text"
            />
            {/* Email Input */}
            <InputField
              placeholder="Enter your email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              inputType="text"
            />

            <div className="choice-input mb-3">
              <InputList
                placeholder="Enter Depatrment"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                inputType="text"
                list={departmentList}
                initialValue={
                  departmentId
                    ? departmentList[departmentId - 1]
                    : "Select Department"
                }
              />
            </div>
            <div className="d-flex justify-content-between mr-3 mt-3">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <button type="reset" className="btn btn-danger">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudentWindow;
