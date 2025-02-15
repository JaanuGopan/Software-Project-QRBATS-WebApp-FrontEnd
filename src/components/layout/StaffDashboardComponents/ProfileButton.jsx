import React, { useContext } from 'react';
import '../../../pages/StaffMainNavigation/StaffMainNavigation.css';
import { AuthContext } from '../../../config/AuthProvider';

const ProfileButton = ({ setIndex }) => {
  const { user } = useContext(AuthContext);
  const { firstName, lastName } = user || {};

  const handleClick = () => {
    setIndex(6);
  };

  return (
    <div className="ProfileButton" onClick={handleClick}>
      <p className="ProfileName">{`${firstName || ''} ${lastName || ''}`}</p>
      {/* <div className="circle">
        <img className="ProfilePicture" src={profilePic} alt="Profile" />
      </div> */}
    </div>
  );
};

export default ProfileButton;
