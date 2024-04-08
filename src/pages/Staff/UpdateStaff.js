import React, { useState } from "react";
import "./StaffA.css";
import axios from "axios";
import Designer from "../../assets/Images/Designer.jpeg";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";

const UpdateStaff = ({
  handlecloseUpdateStaffWindow,
  selectedStaff,
  handleReloadStaffList,
}) => {
  const [userId, setUserId] = useState(selectedStaff.userId);
  const [firstname, setFirstName] = useState(selectedStaff.firstName);
  const [lastname, setLastName] = useState(selectedStaff.lastName);
  const [email, setEmail] = useState(selectedStaff.email);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(selectedStaff.username);
  const [userRole, setUserRole] = useState(selectedStaff.role);
  const [departmentId, setDepartmentId] = useState(selectedStaff.departmentId);
  const navigate = useNavigate();

  const deparmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA"];
  const userRoleList = ["ADMIN", "LECTURER", "STAFF"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/signin",
        {
          userId: userId,
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
    <div className="staff-signup-main-container">
      <div
        className="closeCreateEventWindow"
        onClick={handlecloseUpdateStaffWindow}
      >
        <IoMdCloseCircleOutline />
      </div>
      <p className="staff-head1">Update Staff Details</p>
      <div className="staff-login-container">
        <div className="staff-image-container">
          <img src={Designer} className="staff-logo" alt="Logo" />
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
                className="staff-select-input"
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
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaff;
