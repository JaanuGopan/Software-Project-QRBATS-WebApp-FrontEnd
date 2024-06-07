import React, { useState } from "react";
import "./StaffA.css";
import axios from "axios";
import Designer from "../../assets/Images/Designer.jpeg";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import CreateUserService from "../../api/services/CreateUserService";
import toast, { Toaster } from "react-hot-toast";
import InputList from "../../components/textfields/InputList/InputList";
import Select from "react-select";

const CreateStaff = ({ handleCloseCreateStaffWindow, reloadStaffList }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA", "DIS"];
  const userRoleList = ["ADMIN", "LECTURER"];

  const notifySuccess = () => toast.success("Successfully Staff Created!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CreateUserService.saveUser(
        firstName,
        lastName,
        email,
        password,
        userName,
        departmentList.indexOf(departmentId.value) + 1,
        userRoleList.indexOf(userRole.value)
      );
      if (response) {
        notifySuccess();
        reloadStaffList();
        handleCloseCreateStaffWindow();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="staff-signup-main-container">
      <Toaster />
      <div className="staff-update-title-close-button">
        <h3 className="staff-update-title">Create User</h3>
        <div
          className="staff-update-close-button"
          onClick={handleCloseCreateStaffWindow}
        >
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
      </div>

      <div className="staff-login-container">
        {/* <div className="staff-image-container">
          <img src={Designer} className="staff-logo" alt="Logo" />
        </div> */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="staff-creation-input">
              <label>User Role</label>
              <div className="staff-creation-input-field">
                <Select
                  required
                  value={userRole}
                  onChange={(e) => setUserRole(e)}
                  options={userRoleList.map((role) => ({
                    value: role,
                    label: role,
                  }))}
                  placeholder={"Select User Role"}
                />
              </div>
            </div>
            <div className="staff-creation-input">
              <label>First Name</label>
              <div className="staff-creation-input-field">
                <InputField
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>
            <div className="staff-creation-input">
              <label>Last Name</label>
              <div className="staff-creation-input-field">
                <InputField
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="staff-creation-input">
              <label>Email</label>
              <div className="staff-creation-input-field">
                <InputField
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>
            <div className="staff-creation-input">
              <label>User Name</label>
              <div className="staff-creation-input-field">
                <InputField
                  placeholder="Enter your user name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="staff-creation-input">
              <label>Password</label>
              <div className="staff-creation-input-field">
                <InputField
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputType="password"
                />
              </div>
            </div>
            <div className="staff-creation-input">
              <label>Confirm Password</label>
              <div className="staff-creation-input-field">
                <InputField
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  inputType="password"
                />
              </div>
            </div>
            <div className="staff-creation-input">
              <label>Department</label>
              <div className="staff-creation-input-field">
                <Select
                  required
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e)}
                  options={departmentList.map((dept) => ({
                    value: dept,
                    label: dept,
                  }))}
                  placeholder={"Select Department"}
                />
              </div>
            </div>
            <div className="create-staff-create-button">
              <button type="submit" className="btn btn-success">
                Create Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStaff;
