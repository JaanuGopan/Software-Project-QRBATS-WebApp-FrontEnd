import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaMailBulk } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import UserService from '../../api/services/UserService';
import { FaVoicemail } from 'react-icons/fa6';
import { Email } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

const OtpVerification = ({ handleCloseOtpVerification, handleShowPasswordChange, email }) => {
  const [otp, setOtp] = useState('');

  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await UserService.verifyOtp(email, otp);
      if (response.status === 200) {
        toast.success('Otp successfully verified.');
        handleShowPasswordChange();
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error('Error In Otp Verification.');
      }
    } catch (error) {
      toast.error('Error In Otp Verification.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="signin-form-group">
          <div className="signin-input-with-icon">
            <Email className="input-icon" />
            <input
              required
              type="text"
              id="otp"
              name="otp"
              placeholder="otp"
              className="signin-input-field"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          {processing ? (
            <CircularProgress />
          ) : (
            <button id="LoginID" type="submit" className="btn btn-primary w-100">
              Verify Otp
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;
