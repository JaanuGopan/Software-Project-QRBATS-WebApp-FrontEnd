import React, { useState } from 'react';
import './StaffA.css';
import { useNavigate } from 'react-router-dom';
import InputField from '../../components/textfields/InputBox/InputField';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Select from 'react-select';
import UserService from '../../api/services/UserService';
import { toast, ToastContainer } from 'react-toastify';
import { CircularProgress } from '@mui/material';

const UpdateStaff = ({ handleCloseUpdateStaffWindow, selectedStaff, handleReloadStaffList }) => {
  const [userId, setUserId] = useState(selectedStaff.userId);
  const [firstName, setFirstName] = useState(selectedStaff.firstName);
  const [lastName, setLastName] = useState(selectedStaff.lastName);
  const [email, setEmail] = useState(selectedStaff.email);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(selectedStaff.username);
  const [userRole, setUserRole] = useState(selectedStaff.role);
  const [departmentId, setDepartmentId] = useState(selectedStaff.departmentId);
  const [department, setDepartment] = useState();
  const navigate = useNavigate();

  const departmentList = ['DEIE', 'DCOM', 'DMME', 'DCEE', 'DMENA', 'DIS'];
  const userRoleList = ['ADMIN', 'LECTURER'];

  const [loadingUpdateStaff, setLoadingUpdateStaff] = useState(false);

  const handleInputValidation = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName.trim() === '') {
      toast.error('Please Enter First Name');
      return false;
    }
    if (lastName.trim() === '') {
      toast.error('Please Enter Last Name');
      return false;
    }
    if (email.trim() === '' || !emailPattern.test(email)) {
      toast.error('Please Enter a Valid Email');
      return false;
    }
    if (!departmentId) {
      toast.error('Please Select Department');
      return false;
    }
    if (userRole.trim() === '') {
      toast.error('Please Select User Role');
      return false;
    }
    return true;
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!handleInputValidation()) {
      return;
    }
    try {
      setLoadingUpdateStaff(true);
      const response = await UserService.updateUser(
        userId,
        firstName,
        lastName,
        email,
        '',
        '',
        departmentId
      );
      if (response.status === 200) {
        handleReloadStaffList();
        handleCloseUpdateStaffWindow();
        toast.success('User Updated Successfully!');
      } else if (response.status === 400) {
        toast.error(response.data);
      }
    } catch {
      toast.error('User Updation Failed!');
    } finally {
      setLoadingUpdateStaff(false);
    }
  };

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  };

  return (
    <div className="staff-signup-main-container">
      <div className="staff-update-title-close-button">
        <h3 className="staff-update-title">Update User</h3>
        <div className="staff-update-close-button" onClick={handleCloseUpdateStaffWindow}>
          <IoMdCloseCircleOutline id="close-icon" />
        </div>
      </div>
      <div className="staff-login-container">
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
                  onChange={(e) => setDepartmentId(departmentList.indexOf(e.value) + 1)}
                  options={departmentList.map((dept) => ({
                    value: dept,
                    label: dept,
                  }))}
                  placeholder={'Select Department'}
                />
              </div>
            </div>
            <div className="create-staff-create-button">
              {loadingUpdateStaff ? (
                <div className="d-flex justify-content-center align-items-center">
                  <CircularProgress />
                </div>
              ) : (
                <button type="submit" className="btn btn-warning">
                  <label>Update</label>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateStaff;
