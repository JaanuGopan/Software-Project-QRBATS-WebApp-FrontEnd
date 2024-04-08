import React, { useState } from "react";
import "./Setting.css";
import eventCreationImage from "../../assets/Images/signin/Signin.jpeg";
import { IoMdCloseCircleOutline } from "react-icons/io";

const UpdateSetting = ({ handlecloseUpdateSettingWindow }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
        <img src={eventCreationImage} className="Create-logo" alt="Logo" />
        <div className="eventCreation-input-field">
          <form onSubmit={""}>
            <div className="Setting-input-with-icon">
              <label>Admin Name</label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                placeholder={"Admin Name"}
                className="form-control mb-2"
                value={""}
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
                value={""}
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
                value={""}
                onChange={""}
              />
            </div>
            <button onClick={""} className="btn btn-primary w-100">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSetting;
