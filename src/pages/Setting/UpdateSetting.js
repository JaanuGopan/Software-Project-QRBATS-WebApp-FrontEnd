import React, { useState } from "react";
import "./Setting.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Select from "react-select";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/userSlice";
import Department from "../../utils/Department";
import UserService from "../../api/services/UserService";
import InputField from "../../components/textfields/InputBox/InputField";
import InputPassword from "../../components/textfields/InputPassword/InputPassword";
import toast, { Toaster } from "react-hot-toast";

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

  const [errors, setErrors] = useState({});

  const departmentList = Department.departmentList.map((value, index) => ({
    value: index + 1,
    label: value,
  }));

  const notifySuccess = () => toast.success("Successfully Profile Updated!");
  const notifyPasswordVerify = () =>
    toast.success("Successfully Password Verified!");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleShowOldPassword = (event) => {
    setShowOldPassword(event.target.checked);
    setShowNewPassword(false);
    setOldPassword("");
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleValidation = () => {
    let formErrors = {};
    let formIsValid = true;

    if (!firstName) {
      formIsValid = false;
      formErrors["firstName"] = "First Name cannot be empty";
    }

    if (!lastName) {
      formIsValid = false;
      formErrors["lastName"] = "Last Name cannot be empty";
    }

    if (!email) {
      formIsValid = false;
      formErrors["email"] = "Email cannot be empty";
    } else if (!validateEmail(email)) {
      formIsValid = false;
      formErrors["email"] = "Email is not valid";
    }

    if (!userName) {
      formIsValid = false;
      formErrors["userName"] = "User Name cannot be empty";
    }

    if (showNewPassword) {
      if (!newPassword) {
        formIsValid = false;
        formErrors["newPassword"] = "New Password cannot be empty";
      }

      if (newPassword !== confirmNewPassword) {
        formIsValid = false;
        formErrors["confirmNewPassword"] = "Passwords do not match";
      }
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
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
        notifySuccess();
      }
    }
  };

  const handleVerifyPassword = async (e) => {
    e.preventDefault();
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
          notifyPasswordVerify();
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
      <Toaster />
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
                inputType={"text"}
                placeholder={"Enter First Name"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </div>
            <div className="Setting-input-with-icon">
              <label>Last Name</label>
              <InputField
                inputType={"text"}
                placeholder={"Enter Last Name"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </div>
            <div className="Setting-input-with-icon">
              <label>Email</label>
              <InputField
                inputType={"text"}
                placeholder={"Enter Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
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
                inputType={"text"}
                placeholder={"Enter UserName"}
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                error={!!errors.userName}
                helperText={errors.userName}
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
                    onButtonClick={(e) => handleVerifyPassword(e)}
                    isLoading={isLoading}
                    error={!!errors.oldPassword}
                    helperText={errors.oldPassword}
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
                  error={!!errors.newPassword}
                  helperText={errors.newPassword}
                />
                <label>Confirm New Password</label>
                <InputPassword
                  placeholder={"Renter new Password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  showButton={false}
                  error={!!errors.confirmNewPassword}
                  helperText={errors.confirmNewPassword}
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
