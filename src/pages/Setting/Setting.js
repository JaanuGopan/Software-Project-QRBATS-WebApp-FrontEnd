import "./Setting.css";
import personIcon from "../../assets/Images/personIcon/person_icon.png";
import React, { useState } from "react";
import UpdateSetting from "./UpdateSetting";

const Setting = () => {
  const [adminUpdateSettingPopUpWindow, setAdminUpdateSettingPopUpWindow] =
    useState(false);

  const [firstName, setFirstName] = useState("FirstName");

  return (
    <div className="setting-main-container2">
      <div className="setting-field">
        <div className="setting-person-icon-container">
          <img src={personIcon} className="Create-logo" alt="Logo" />
        </div>
        <div className="setting-content">
          <div className="setting-label">
            <label>First Name</label>
            <label>{`: ${firstName}`}</label>
          </div>
        </div>
        <div className="eventCreation-input-field">
          <button
            onClick={() => setAdminUpdateSettingPopUpWindow(true)}
            className="btn btn-primary w-100"
          >
            Update
          </button>
        </div>
      </div>
      {adminUpdateSettingPopUpWindow && (
        <div
          handleClick={() => setAdminUpdateSettingPopUpWindow(false)}
          className="student-Create-Event-Dashboard"
        >
          <UpdateSetting
            handlecloseUpdateSettingWindow={() =>
              setAdminUpdateSettingPopUpWindow(false)
            }
          />
        </div>
      )}
    </div>
  );
};

export default Setting;
