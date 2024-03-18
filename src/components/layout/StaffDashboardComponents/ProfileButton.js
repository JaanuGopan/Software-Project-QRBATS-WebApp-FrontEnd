import React from "react";
import "../../pages/StaffMainNavigation/StaffMainNavigation.css";
import profilePic from "../../../assets/Images/Profile.png";
import { useLocation } from "react-router-dom";

const ProfileButton = () => {
  const handleClick = () => {
    console.log("We have to design that Show Setting Window");
  };
  const location = useLocation();
  const { userName } = location.state;

  return (
    <div className="ProfileButton" onClick={handleClick}>
      <p className="ProfileName">{userName}</p>
      <div className="circle">
        <img className="ProfilePicture" src={profilePic} alt="" />
      </div>
    </div>
  );
};

export default ProfileButton;
