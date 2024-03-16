import React from 'react';
import '../../pages/StaffMainNavigation/StaffMainNavigation.css'
import profilePic from '../../../assets/Images/Profile.png'

const ProfileButton = () => {
    const handleClick = () => {
        console.log('We have to design that Show Setting Window');
    };
  return (
    <div className='ProfileButton' onClick={handleClick}>
      <p className='ProfileName'>Sivakkanth</p>
      <div className='circle'>
        <img className='ProfilePicture' src={profilePic} alt=''/>
      </div>
    </div>
  );
}

export default ProfileButton;