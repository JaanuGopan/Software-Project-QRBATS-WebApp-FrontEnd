import './Setting.css';
import React, { useState } from 'react';
import UpdateSetting from './UpdateSetting';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '../../assets/Images/personIcon/person_icon.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userSlice';
import Department from '../../utils/Department';
const Setting = () => {
  const [adminUpdateSettingPopUpWindow, setAdminUpdateSettingPopUpWindow] = useState(false);

  const { userId, firstName, lastName, email, userName, departmentId, role } =
    useSelector(selectUser);

  const department = Department.departmentList[departmentId - 1];

  return (
    <div className="setting-main-container2">
      <div className="setting-field">
        <div className="setting-person-icon-container">
          <Avatar alt="Remy Sharp" sx={{ width: 150, height: 150 }} src={PersonIcon}></Avatar>
        </div>
        <div className="setting-content">
          <div className="setting-label">
            <label id="setting-label-1">First Name</label>
            <label id="setting-label-2">{`: ${firstName}`}</label>
          </div>
          <div className="setting-label">
            <label id="setting-label-1">Last Name</label>
            <label id="setting-label-2">{`: ${lastName}`}</label>
          </div>
          <div className="setting-label">
            <label id="setting-label-1">Email</label>
            <label id="setting-label-2">{`: ${email}`}</label>
          </div>
          {role === 'LECTURER' && (
            <div className="setting-label">
              <label id="setting-label-1">Department</label>
              <label id="setting-label-2">{`: ${department}`}</label>
            </div>
          )}
          <div className="setting-label">
            <label id="setting-label-1">Role</label>
            <label id="setting-label-2">{`: ${role}`}</label>
          </div>
        </div>
        <div className="setting-page-button-container">
          <button
            onClick={() => setAdminUpdateSettingPopUpWindow(true)}
            className="btn btn-warning"
          >
            Update
          </button>
        </div>
      </div>
      {adminUpdateSettingPopUpWindow && (
        <div className="student-Create-Event-Dashboard">
          <UpdateSetting
            handleCloseUpdateSettingWindow={() => setAdminUpdateSettingPopUpWindow(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Setting;
