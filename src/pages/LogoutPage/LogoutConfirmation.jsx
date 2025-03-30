import React from 'react';
import './LogoutConfirmation.css';

const LogoutConfirmation = ({ handleCloseLogoutWindow, handleLogout }) => {
  return (
    <div className="logoutConfirmation-main-container">
      <div className="logoutConfirmation-field">
        <div className="logoutConfirmation-text">
          <h6>Are you sure you want to logout? </h6>
        </div>
        <div className="logoutConfirmation-buttons">
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
          <button onClick={handleCloseLogoutWindow} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
