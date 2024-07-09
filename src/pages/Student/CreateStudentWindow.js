import React, { useState } from "react";
import "./Student.css";
import axios from "axios";
import Designer from "../../assets/Images/Designer.jpeg";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Select from "react-select";
import StudentService from "../../api/services/StudentService";
import { ToastContainer, toast } from "react-toastify";

const CreateStudentWindow = ({
  handleCloseCreateStudentWindow,
  handleReloadStudentList,
}) => {
  const [studentName, setStudentName] = useState("");
  const [studentIndexNo, setStudentIndexNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [semester, setSemester] = useState();
  const [departmentId, setDepartmentId] = useState("");

  const semesterList = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match");
      return;
    }
    const response = await StudentService.createStudentByAdmin(
      -1,
      studentName,
      studentIndexNo,
      email,
      userName,
      password,
      semesterList.indexOf(semester.value) + 1,
      departmentList.indexOf(departmentId.value) + 1
    );
    if (response.status === 200) {
      toast.success("Successfully Student Created.");
      handleReloadStudentList();
      handleCloseCreateStudentWindow();
    } else {
      toast.error(response);
    }
  };

  return (
    <div className="student-signup-main-container">
      <div className="student-create-title-close-button">
        <h3 className="student-create-title">Create Student</h3>
        <div
          className="student-create-close-button"
          onClick={handleCloseCreateStudentWindow}
        >
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
      </div>
      <div className="student-login-container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="student-creation-input">
              <label>Student Name</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="student-creation-input">
              <label>Student IndexNo</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student IndexNo"
                  value={studentIndexNo}
                  onChange={(e) => setStudentIndexNo(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="student-creation-input">
              <label>Student Email</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="student-creation-input">
              <label>Student UserName</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Student UserName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  inputType="text"
                />
              </div>
            </div>

            <div className="student-creation-input">
              <label>Password</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  inputType="password"
                />
              </div>
            </div>
            <div className="student-creation-input">
              <label>Confirm Password</label>
              <div className="student-creation-input-field">
                <InputField
                  placeholder="Re-enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  inputType="password"
                />
              </div>
            </div>
            <div className="student-creation-input">
              <label>Current Semester</label>
              <div className="student-creation-input-field">
                <div className="eventCreation-form">
                  <Select
                    required
                    value={semester}
                    onChange={(e) => setSemester(e)}
                    options={semesterList.map((sem) => ({
                      value: sem,
                      label: sem,
                    }))}
                    placeholder={"Select Semester"}
                  />
                </div>
              </div>
            </div>
            <div className="student-creation-input">
              <label>Student Department</label>
              <div className="student-creation-input-field">
                <div className="eventCreation-form">
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
            </div>
            <di className="student-creation-save-button-container">
              <button
                type="submit"
                className="btn btn-success student-creation-save-button"
              >
                Create Student
              </button>
            </di>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentWindow;
