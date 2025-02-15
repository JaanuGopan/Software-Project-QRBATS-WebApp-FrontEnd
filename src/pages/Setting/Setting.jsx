import Avatar from '@mui/material/Avatar';
import React, { useContext, useState } from 'react';
import PersonIcon from '../../assets/Images/personIcon/person_icon.png';
import AppContentCard from '../../components/app-content-card/app-content-card';
import { AuthContext } from '../../config/AuthProvider';
import Department from '../../utils/Department';
import './Setting.css';
import UpdateSetting from './UpdateSetting';

const Setting = () => {
  const [adminUpdateSettingPopUpWindow, setAdminUpdateSettingPopUpWindow] = useState(false);

  const { user } = useContext(AuthContext);
  const { firstName, lastName, email, departmentId, role } = user || {};

  const department = Department.departmentList[departmentId - 1];

  return (
    <div className="row">
      <div className="col">
        <AppContentCard>
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col">
              <div className="row justify-content-center mb-5">
                <Avatar alt="Remy Sharp" sx={{ width: 150, height: 150 }} src={PersonIcon}></Avatar>
              </div>
              <div className="row justify-content-center ">
                <div className="col-auto">
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
          </div>
        </AppContentCard>
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
