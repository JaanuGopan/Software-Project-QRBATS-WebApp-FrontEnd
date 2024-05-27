import React, { useState } from "react";
import "./Setting.css";
import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { CircularProgress, TextField } from "@mui/material";
import InputField from "../../components/textfields/InputBox/InputField";
import Select from "react-select";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import Department from "../../utils/Department";
import UserService from "../../api/services/UserService";
import InputPassword from "../../components/textfields/InputPassword/InputPassword";

const UpdateSetting = ({ handlecloseUpdateSettingWindow }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [userRole, setUserRole] = useState(user.role);
  const [departmentId, setDepartmentId] = useState({
    value: user.departmentId,
    label: Department.departmentList[user.departmentId - 1],
  });
  const [userName, setUserName] = useState(user.userName);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const departmentList = Department.departmentList.map((value, index) => ({
    value: index + 1,
    label: value,
  }));

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowOldPassword = (event) => {
    setShowOldPassword(event.target.checked);
    setShowNewPassword(false);
    setOldPassword("");
  };

  const handleValidation = () => {};

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    const response = await UserService.updateUser(
      user.userId,
      firstName,
      lastName,
      email,
      userName,
      newPassword,
      departmentId.value
    );
    if (response) {
      handlecloseUpdateSettingWindow();
    }
  };

  const handleVerifyPassword = async () => {
    if (oldPassword) {
      setIsLoading(true);
      try {
        const response = await UserService.verifyPassword(
          userName,
          oldPassword
        );
        console.log(response);
        if (response === true) {
          setShowNewPassword(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="setting-update-main-container">
      <div
        className="closeCreateEventWindow"
        onClick={handlecloseUpdateSettingWindow}
      >
        <IoMdCloseCircleOutline />
      </div>
      <h2>Update Profile</h2>
      <div className="setting-field">
        <div className="update-setting-input-form">
          <form onSubmit={handleUpdateUser}>
            <div className="Setting-input-with-icon">
              <label>First Name</label>
              <InputField
                required
                type={"text"}
                placeholder={"Enter First Name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="Setting-input-with-icon">
              <label>Last Name</label>
              <InputField
                type={"text"}
                placeholder={"Enter Last Name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="Setting-input-with-icon">
              <label>Email</label>
              <InputField
                type={"text"}
                placeholder={"Enter Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {user.role === "LECTURER" && (
              <div className="Setting-input-with-icon">
                <label>Department</label>
                <Select
                  required
                  id="department"
                  name="department"
                  placeholder={"Select Department"}
                  options={departmentList}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e)}
                />
              </div>
            )}
            <div className="Setting-input-with-icon">
              <label>User Name</label>
              <InputField
                type={"text"}
                placeholder={"Enter UserName"}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label>Change Password</label>
              <Switch
                checked={showOldPassword}
                onChange={handleShowOldPassword}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>

            {showOldPassword === true && showNewPassword === false && (
              <div className="Setting-input-with-icon">
                <label>Old Password</label>
                <div className="col">
                  <InputPassword
                    placeholder={"Enter Old Password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    buttonText={"verify"}
                    onButtonClick={handleVerifyPassword}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            )}
            {showOldPassword && showNewPassword && (
              <div className="Setting-input-with-icon">
                <label>New Password</label>
                <InputPassword
                  placeholder={"Enter new Password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  showButton={false}
                />
                <label>Confirm New Password</label>
                <InputPassword
                  placeholder={"Renter new Password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  showButton={false}
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSetting;
