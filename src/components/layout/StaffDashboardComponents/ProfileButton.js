import React from "react";
import "../../pages/StaffMainNavigation/StaffMainNavigation.css";
import profilePic from "../../../assets/Images/Profile.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/features/userSlice";

const ProfileButton = () => {
  //get the user from redux
  const user = useSelector(selectUser);

  const handleClick = () => {
    console.log("We have to design that Show Setting Window");
  };

  return (
    <div className="ProfileButton" onClick={handleClick}>
      <p className="ProfileName">{user?.firstName + " " + user?.lastName}</p>
      <div className="circle">
        <img className="ProfilePicture" src={profilePic} alt="" />
      </div>
    </div>
  );
};

export default ProfileButton;
