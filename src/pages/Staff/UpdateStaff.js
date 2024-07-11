import React, { useState } from "react";
import "./StaffA.css";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/textfields/InputBox/InputField";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Select from "react-select";
import UserService from "../../api/services/UserService";
import { toast, ToastContainer } from "react-toastify";

const UpdateStaff = ({
  handleCloseUpdateStaffWindow,
  selectedStaff,
  handleReloadStaffList,
}) => {
  const [userId, setUserId] = useState(selectedStaff.userId);
  const [firstName, setFirstName] = useState(selectedStaff.firstName);
  const [lastName, setLastName] = useState(selectedStaff.lastName);
  const [email, setEmail] = useState(selectedStaff.email);
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState(selectedStaff.username);
  const [userRole, setUserRole] = useState(selectedStaff.role);
  const [departmentId, setDepartmentId] = useState(selectedStaff.departmentId);
  const [department, setDepartment] = useState();
  const navigate = useNavigate();

  const departmentList = ["DEIE", "DCOM", "DMME", "DCEE", "DMENA", "DIS"];
  const userRoleList = ["ADMIN", "LECTURER"];

  const handleSaveUser = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.updateUser(
        userId,
        firstName,
        lastName,
        email,
        "",
        "",
        departmentId
      );
      if (response.status === 200) {
        handleReloadStaffList();
        //handleCloseUpdateStaffWindow();
        toast.success("User Updated Successfully!");
      } else if (response.status === 400) {
        toast.error(response.data);
      }
    } catch {
      toast.error("User Updation Failed!");
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
      <div className="staff-update-title-close-button">
        <h3 className="staff-update-title">Update User</h3>
        <div
          className="staff-update-close-button"
          onClick={handleCloseUpdateStaffWindow}
        >
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
      </div>
      <div className="staff-login-container">
        {/* <div className="staff-image-container">
          <img src={Designer} className="staff-logo" alt="Logo" />
        </div> */}
        <div className="form-container">
          <form onSubmit={handleSaveUser}>
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
              <label>Department</label>
              <div className="staff-creation-input-field">
                <Select
                  required
                  value={{
                    value: departmentList[departmentId - 1],
                    label: departmentList[departmentId - 1],
                  }}
                  onChange={(e) =>
                    setDepartmentId(departmentList.indexOf(e.value) + 1)
                  }
                  options={departmentList.map((dept) => ({
                    value: dept,
                    label: dept,
                  }))}
                  placeholder={"Select Department"}
                />
              </div>
            </div>
            <div className="create-staff-create-button">
              <button type="submit" className="btn btn-warning">
                <label>Update</label>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaff;
