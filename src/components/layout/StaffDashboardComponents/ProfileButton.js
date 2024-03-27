import React from "react";
import "../../pages/StaffMainNavigation/StaffMainNavigation.css";
import profilePic from "../../../assets/Images/Profile.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/userSlice";

const ProfileButton = () => {
  // Get the user from Redux state
  const user = useSelector(selectUser);

  const handleClick = () => {
    console.log("Show Settings Window"); // Corrected spelling
    // You can add logic to show settings window here
  };

  // Destructure user object for cleaner code
  const { firstName, lastName } = user || {};

  return (
    <div className="ProfileButton" onClick={handleClick}>
      {/* Display user's full name */}
      <p className="ProfileName">{`${firstName || ""} ${lastName || ""}`}</p>
      <div className="circle">
        {/* Display profile picture */}
        <img className="ProfilePicture" src={profilePic} alt="Profile" />
      </div>
    </div>
  );
};

export default ProfileButton;
