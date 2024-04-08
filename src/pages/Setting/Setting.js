import "./Setting.css";
import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import React, { useState } from "react";
import UpdateSetting from "./UpdateSetting";

const Setting = () => {
  const [adminUpdateSettingPopUpWindow, setAdminUpdateSettingPopUpWindow] =
    useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="setting-main-container2">
      <h2>Profile</h2>
      <div className="setting-field">
        <img src={eventCreationImage} className="Create-logo" alt="Logo" />
        <div className="eventCreation-input-field">
          <div className="Setting-input-with-icon">
            <label>First Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              placeholder={"Admin Name"}
              className="form-control mb-2"
              value={firstName}
              onChange={""}
            />
          </div>
          <div className="Setting-input-with-icon">
            <label>Last Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              placeholder={"Admin Name"}
              className="form-control mb-2"
              value={lastName}
              onChange={""}
            />
          </div>
          <div className="Setting-input-with-icon">
            <label>Username</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              placeholder={"Username"}
              className="form-control mb-2"
              value={userName}
              onChange={""}
            />
          </div>
          <div className="Setting-input-with-icon">
            <label>Password</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              placeholder={"Password"}
              className="form-control mb-2"
              value={password}
              onChange={""}
            />
          </div>
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
