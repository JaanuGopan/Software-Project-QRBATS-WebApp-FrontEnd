import Switch from '@mui/material/Switch';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import UserService from '../../api/services/UserService';
import InputField from '../../components/textfields/InputBox/InputField';
import InputPassword from '../../components/textfields/InputPassword/InputPassword';
import WarningPopup from '../../components/warningPopup/WarningPopup';
import { AuthContext } from '../../config/AuthProvider';
import { resetSideBarIndex } from '../../redux/features/mainNavigationSlice';
import Department from '../../utils/Department';
import './Setting.css';

const UpdateSetting = ({ handleCloseUpdateSettingWindow }) => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState();
  const [departmentId, setDepartmentId] = useState({});
  const [userName, setUserName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const departmentList = Department.departmentList.map((value, index) => ({
    value: index + 1,
    label: value,
  }));

  const notifySuccess = () => toast.success('Successfully Profile Updated!');
  const notifyPasswordVerify = () => toast.success('Successfully Password Verified!');

  useEffect(() => {
    if (user) {
      const response = axios.get('/api/v1/auth/user').then((res) => {
        setUserName(res.data.userName);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setUserRole(res.data.role);
        setDepartmentId({
          value: res.data.departmentId,
          label: Department.departmentList[res.data.departmentId - 1],
        });
      });
    }
  }, []);

  const handleShowOldPassword = (event) => {
    setShowOldPassword(event.target.checked);
    setShowNewPassword(false);
    setOldPassword('');
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
      formErrors['firstName'] = 'First Name cannot be empty';
    }

    if (!lastName) {
      formIsValid = false;
      formErrors['lastName'] = 'Last Name cannot be empty';
    }

    if (!email) {
      formIsValid = false;
      formErrors['email'] = 'Email cannot be empty';
    } else if (!validateEmail(email)) {
      formIsValid = false;
      formErrors['email'] = 'Email is not valid';
    }

    if (!userName) {
      formIsValid = false;
      formErrors['userName'] = 'User Name cannot be empty';
    }

    if (showNewPassword) {
      if (!newPassword) {
        formIsValid = false;
        formErrors['newPassword'] = 'New Password cannot be empty';
      }

      if (newPassword !== confirmNewPassword) {
        formIsValid = false;
        formErrors['confirmNewPassword'] = 'Passwords do not match';
      }
    }

    setErrors(formErrors);
    return formIsValid;
  };

  const handleLogoutClick = () => {
    dispatch(resetSideBarIndex());
    logout();
  };

  const [loadingUpdateUser, setLoadingUpdateUser] = useState(false);
  const handleUpdateUser = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        setLoadingUpdateUser(true);
        const response = await UserService.updateUser(
          user.userId,
          firstName,
          lastName,
          email,
          userName,
          newPassword,
          departmentId.value
        );
        if (response.status === 200) {
          handleCloseUpdateSettingWindow();
          notifySuccess();
          handleLogoutClick();
        } else if (response.status === 400) {
          setErrors(response.data);
          toast.error(response.data);
          setShowUpdateWarning(false);
        }
      } finally {
        setLoadingUpdateUser(false);
      }
    } else {
      setShowUpdateWarning(false);
    }
  };

  const handleVerifyPassword = async (e) => {
    e.preventDefault();
    if (oldPassword) {
      setIsLoading(true);
      try {
        const response = await UserService.verifyPassword(userName, oldPassword);
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

  const [showUpdateWarning, setShowUpdateWarning] = useState(false);

  const handleShowUpdateWarning = (e) => {
    e.preventDefault();
    setShowUpdateWarning(true);
  };

  return (
    <div className="setting-update-main-container">
      <Toaster />
      <div className="setting-update-title-close-button">
        <h3 className="setting-update-title">Update Profile</h3>
        <div className="setting-update-close-button" onClick={handleCloseUpdateSettingWindow}>
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
      </div>
      <div className="setting-field">
        <div className="update-setting-input-form">
          <form onSubmit={handleShowUpdateWarning}>
            <div className="Setting-input-with-icon">
              <label>First Name</label>
              <InputField
                required
                inputType={'text'}
                placeholder={'Enter First Name'}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </div>
            <div className="Setting-input-with-icon">
              <label>Last Name</label>
              <InputField
                inputType={'text'}
                placeholder={'Enter Last Name'}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </div>
            <div className="Setting-input-with-icon">
              <label>Email</label>
              <InputField
                inputType={'text'}
                placeholder={'Enter Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
            {user.role === 'LECTURER' && (
              <div className="Setting-input-with-icon">
                <label>Department</label>
                <Select
                  required
                  id="department"
                  name="department"
                  placeholder={'Select Department'}
                  options={departmentList}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e)}
                />
              </div>
            )}
            <div className="Setting-input-with-icon">
              <label>User Name</label>
              <InputField
                inputType={'text'}
                placeholder={'Enter UserName'}
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
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </div>

            {showOldPassword === true && showNewPassword === false && (
              <div className="Setting-input-with-icon">
                <label>Old Password</label>
                <div className="col">
                  <InputPassword
                    placeholder={'Enter Old Password'}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    buttonText={'verify'}
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
                  placeholder={'Enter new Password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  showButton={false}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword}
                />
                <label>Confirm New Password</label>
                <InputPassword
                  placeholder={'Renter new Password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  showButton={false}
                  error={!!errors.confirmNewPassword}
                  helperText={errors.confirmNewPassword}
                />
              </div>
            )}

            <div className="settings-update-button">
              <button type="submit" className="btn btn-warning w-100 mt-3">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {showUpdateWarning && (
        <div className="setting-update-warning-container">
          <WarningPopup
            handleOk={handleUpdateUser}
            titleText={'If You Want To Update, You Need To Login Again'}
            buttonText={'Update'}
            handleCloseWarningWindow={() => setShowUpdateWarning(false)}
            processing={loadingUpdateUser}
          />
        </div>
      )}
    </div>
  );
};

export default UpdateSetting;
