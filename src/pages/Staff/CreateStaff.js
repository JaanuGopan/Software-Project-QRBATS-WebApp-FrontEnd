import React, { useState } from "react";
import "./StaffA.css";
import axios from "axios";
import Designer from "../../assets/Images/Designer.jpeg";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateUserService from "../../api/services/CreateUserService";

const CreateStaff = ({ handlecloseCreateStaffWindow }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const deparmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];
  const userRoleList = ["ADMIN", "LECTURER"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = CreateUserService.saveUser(
        firstname,
        lastname,
        email,
        password,
        userName,
        deparmentList.indexOf(departmentId) + 1,
        userRoleList.indexOf(userRole)
      );

      console.error("Login success...");
      handlecloseCreateStaffWindow();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="staff-signup-main-container">
      <div
        className="closeCreateEventWindow"
        onClick={handlecloseCreateStaffWindow}
      >
        <IoMdCloseCircleOutline />
      </div>
      <p className="staff-head1">Create Staff</p>
      <div className="staff-login-container">
        <div className="staff-image-container">
          <img src={Designer} className="staff-logo" alt="Logo" />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="choice-input mb-3">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="student-select-input"
              >
                <option value="">Select user role</option>
                {userRoleList.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            {/* First Name Input */}
            <InputField
              placeholder="Enter your first name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              inputType="text"
            />

            {/* Last Name Input */}
            <InputField
              placeholder="Enter your last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              inputType="text"
            />

            {/* Email Input */}
            <InputField
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputType="text"
            />

            <InputField
              placeholder="Enter your user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              inputType="text"
            />

            {/* Password Input */}
            <InputField
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputType="password"
            />
            <InputField
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              inputType="password"
            />

            <div className="choice-input mb-3">
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="student-select-input"
              >
                <option value="">Select the department</option>
                {deparmentList.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Add Staff
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;
