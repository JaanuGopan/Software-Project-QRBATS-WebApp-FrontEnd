import React, { useState } from "react";
import "./Student.css";
import axios from "axios";
import Designer from "../../assets/Images/Designer.jpeg";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";

const CreateStudentWindow = ({ handlecloseCreateStudentWindow }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const navigate = useNavigate();

  const deparmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];
  const userRoleList = ["ADMIN", "LECTURER", "STAFF"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        {
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
          userName: userName,
          departmentId: deparmentList.indexOf(departmentId) + 1,
        }
      );
      const token = response.data.token;
      const decodedToken = parseJwt(token);
      const userName = decodedToken.sub;
      localStorage.setItem("token", token);
      navigate("/mainNavigation", { state: { userName } });
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
        onClick={handlecloseCreateStudentWindow}
      >
        <IoMdCloseCircleOutline />
      </div>
      <p className="student-head1">Create Student</p>
      <div className="student-login-container">
        <div className="student-image-container">
          <img src={Designer} className="student-logo" alt="Logo" />
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
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
              Add Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentWindow;
